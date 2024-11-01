require('dotenv').config();

const whatsappConfig = {
    appId: process.env.WHATSAPP_APP_ID,
    appSecret: process.env.WHATSAPP_APP_SECRET,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    wabaId: process.env.WHATSAPP_WABA_ID,
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN  // for webhook verification
};

module.exports = whatsappConfig;




// / Initialize WhatsApp API client
// const whatsappAPI = axios.create({
//     baseURL: 'https://graph.facebook.com/v17.0/',
//     headers: {
//         'Authorization': `Bearer ${whatsappConfig.accessToken}`,
//         'Content-Type': 'application/json'
//     }
// });

// // Example function to send message
// async function sendWhatsAppMessage(to, message) {
//     try {
//         const response = await whatsappAPI.post(`/${whatsappConfig.phoneNumberId}/messages`, {
//             messaging_product: "whatsapp",
//             to: to,
//             type: "text",
//             text: { body: message }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error sending WhatsApp message:', error);
//         throw error;
//     }
// }