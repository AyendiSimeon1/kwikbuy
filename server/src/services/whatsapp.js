const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const RateLimiter = require('../utils/rate-limiter');
const MessageQueue = require('../utils/message-queue');
const redis = require('redis'); // Assuming redis is required
const config = require('../config/index');


class WhatsAppService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://graph.facebook.com/v21.0/479470328580712',
            timeout: 10000,
        });
        this.rateLimiter = new RateLimiter({
            redis,
            key: 'whatsapp_broadcast',
            windowSizeInSeconds: 60,
            maxRequests: 200,
        });
        this.messageQueue = new MessageQueue({ redis, key: 'whatsapp_messages' });
    }
    async createMessageTemplate(templateData) {
        try {
            console.log(templateData);
            const response = await this.axiosInstance.post(
             '/message_templates', // endpoint path only
             {
                name: templateData.name,
                language: templateData.language,
                category: templateData.category,
                components: templateData.components,
            },
                {
                    params: {
                        access_token: 'EAAMO9QD5ATQBOZBBRmyWChSZBGQ3UPxhZBXUg6wRnu7DXkg1yhMugxXPD4R7dZBX2SGIsNlz3XYE6CPCfKm9eFv76Pmmqnz2M1YgjSZC7FOSRB0Esb5ctWffGG1PrTVmTrqExaGt0jQP6mbCvddWoijfYWh2fyH1eSCH5bXfH2qgG8fOtLyhyjJmhb8h9pqHOzMHriNYUmqUA4XHwPXERVAvAaHwZD',
                    },
                }
            );
            return {
                success: true,
                templateData: response.data
            };
        } catch (error) {
            // Log detailed error information
            if (error.response) {
                // Request was made and server responded
                console.error('Error in createMessageTemplate:');
                console.error('Status Code:', error.response.status);
                console.error('Status Text:', error.response.statusText);
                console.error('Headers:', JSON.stringify(error.response.headers, null, 2));
                console.error('Data:', JSON.stringify(error.response.data, null, 2));
                
                throw new ApolloError(
                    error.response.data?.error?.message || 'Failed to create template',
                    error.response.status
                );
            } else if (error.request) {
                // Request was made but no response was received
                console.error('No response received:', error.request);
                throw new ApolloError('No response from WhatsApp API');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                throw new ApolloError(error.message);
            }
        } finally {
            console.log('HI')
        }
    }
    async getAllTemplates () {
        try {
            const response = await this.axiosInstance.get({
                url: '/me/message_templates',
                params: {
                    access_token: config.FB_ACCESS_TOKEN,
                },
            });
            return {
                success: true,
                templates: response.data.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error?.message || 'UNKNOWN ERROR',
                errorCode: 500
            }
        }
    }
    async deleteMessageTemplate (templateName) {
        try {
            const response = await this.axiosInstance.delete({
                url: `/me/message_templates/${templateName}`,
                params: {
                    access_token: config.FB_ACCESS_TOKEN,
                },
            });
            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error?.message || 'UNKNOWN ERROR',
                errorCode: 500
            }
        }
    }
    async sendBroadcastMessage(input) {
        const messageId = uuidv4();
        const recipientBatches = this._batchRecipients(input.recipients, 50);

        try {
            await this._validateTemplate(input.templateName);
            await this._validateRecipientsOptIn(input.recipients);

            if (input.sendBroadcastMessage) {
                await this._scheduleMessage(messageId, input);
                return this._createResponse(messageId, 'SCHEDULED');
            }

            const results = await this._processBroadcast(messageId, input, recipientBatches);
            return this._createBroadcastResponse(results, messageId);
        } catch (error) {
            logger.error('Broadcast failed', {
                messageId,
                error: error.stack,
            });
            return {
                success: false,
                recipientPhone: recipient.phoneNumber,
                error: error.response?.data?.error?.code || 'UNKNOWN ERROR',
            };
           


        }
    }

    async _processBroadcast(messageId, input, recipientBatches) {
        const results = [];
        for (const batch of recipientBatches) {
            if (!(await this.rateLimiter.canProceed())) {
                await this.rateLimiter.waitForNextSlot();
            }

            try {
                const batchResults = await Promise.all(
                    batch.map(recipient => this._sendTemplateMessage(
                        messageId,
                        recipient,
                        input.templateName,
                        input.parameters
                    ))
                );
                results.push(...batchResults);
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                logger.error('Batch processing failed', {
                    messageId,
                    batchSize: batch.length,
                    error: error.stack,
                });
                await this._storeFailedBatch(messageId, batch, error);
            }
        }
        return results;
    }

    async _sendTemplateMessage(messageId, recipient, templateName, parameters) {
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneNumberId = process.env.TZ_PHONE_NUMBER_ID;

        try {
            const response = await this.axiosInstance.post(
                `/${phoneNumberId}/messages`,
                {
                    messaging_product: "whatsapp",
                    to: recipient.phoneNumber,
                    template: {
                        name: templateName,
                        language: {
                            code: "en"
                        },
                        components: this._formatTemplateParameters(parameters, recipient.customParameters)
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            await this._trackMessageStatus(messageId, recipient.phoneNumber, response.data.messages[0].id);
            return {
                success: true,
                recipientPhone: recipient.phoneNumber,
                whatsapp_messages_id: response.data.messages[0].id,
            };
        } catch (error) {
            logger.error('Failed to send message', {
                messageId,
                recipient: recipient.phoneNumber,
                error: error.response?.data?.error?.code || 'UNKNOWN ERROR',
            });
        }
    }

    async _validateTemplate(templateName) {
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneNumberId = process.env.TZ_PHONE_NUMBER_ID;

        const response = await this.axiosInstance.get(
            `/${phoneNumberId}/templates`,
            {
                params: {
                    name: templateName
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }
        );

        if (response.data.templates.length === 0) {
            throw new Error(`No template found with name ${templateName}`);
        }
    }

    async _validateRecipientsOptIn(recipients) {
        const promises = recipients.map(recipient => this._validateRecipientOptIn(recipient.phoneNumber));
        await Promise.all(promises);
    }

    _batchRecipients(recipients, batchSize) {
        const batches = [];
        for (let i = 0; i < recipients.length; i += batchSize) {
            batches.push(recipients.slice(i, i + batchSize));
        }
        return batches;
    }

    _formatTemplateParameters(parameters, customParameters) {
        return parameters.map(parameter => {
            switch (parameter.type) {
                case 'BODY':
                    return { type: 'body', text: parameter.value };
                case 'HEADER':
                    return { type: 'header', text: parameter.value };
                case 'BUTTON':
                    return {
                        type: 'button',
                        text: parameter.value,
                        action: { type: 'open_url', url: customParameters.url },
                    };
                default:
                    throw new Error(`Unknown parameter type ${parameter.type}`);
            }
        });
    }

    async _trackMessageStatus(messageId, recipientPhone, whatsappMessageId) {
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneNumberId = process.env.TZ_PHONE_NUMBER_ID;

        try {
            const response = await this.axiosInstance.get(
                `/${phoneNumberId}/messages/${whatsappMessageId}`,
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                }
            );

            const messageStatus = response.data.messages[0].status;
            await this.messageQueue.add({
                messageId,
                recipientPhone,
                whatsappMessageId,
                status: messageStatus,
            });
        } catch (error) {
            logger.error('Failed to track message status', {
                messageId,
                recipientPhone,
                error: error.response?.data?.error?.code || 'UNKNOWN ERROR',
            });
        }
    }
}

module.exports = WhatsAppService;
