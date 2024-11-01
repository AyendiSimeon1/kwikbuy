const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const WhatsAppService = require('../services/whatsapp');

class ChatbotService {
    constructor() {
        this.whatsapp = new WhatsAppService();
    }

    async createChatbot(userId, input) {
        try {
            const chatbodId = uuidv4();
            const chatbot = {
                id: chatbodId,
                userId,
                ...input,
                name: input.name,
                description: input.description,
                flow: input.flow,
                status: 'DRAFT',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await this.validateFlow(input.flow);
            await this.saveChatbot(chatbot);
            return chatbot;
        } catch (error) {
            logger.error('Failed to create chatbot', { error, userId});
            throw error;    
    }
}

async handleIncomingMessage(message) {
    try {
        const session = await this.getOrCreateSession(message.from);
        const chatbot = await this.getChatbot(session.chatbotId);

        if (!chatbot || chatbot.status!== 'PUBLISHED') {
            return;
    }

    const response = await this.processMessage(message, session, chatbot);
    await this.sendResponse(response, message.from);
    await this.saveSession(session);
} catch(error) {
    logger.error('Error processing incoming message', { error, message });  

}

}

async processMessage(message, session, chatbot) {
    const currentNode = await this.getCurrentNode(sesion, chatbot);
    const userInput = message.text || message.type;

    switch(currentNode.type) {
        case 'QUESTION':
            return this.processQuestionNode(currentNode, userInput, session);
        case 'CONDITION':
            return this.processConditionNode(currentNode, userInput, session);
        case 'ACTION':
            return this.processActionNode(currentNode, session);
        default: 
            return this.processMessageNode(currentNode, session);
    }

}

async processQuestionNode(node, userInput, session) {
    const isValid = await this.validateUserInput(node, userInput);
    if(!isValid) {
        return {
            type: 'error',
            message: node.data.errorMessage || 'Invalid input'

        };

    }

    await this.updateSessionVariable(session, node.data.variable, userInput);
    const nextNode = await this.findNextNode(node, userInput, session);
    await this.updateSessionNode(session, nextNode.id);
    return this.createResponse(nextNode);
}

async processConditionNode(node, session) {
    const condition = node.data.conditions[0]; // Simplified for example
    const sessionValue = await this.getSessionVariable(session, condition.variable);
    
    let nextNodeId;
    if (this.evaluateCondition(condition, sessionValue)) {
      nextNodeId = node.data.trueNode;
    } else {
      nextNodeId = node.data.falseNode;
    }

    const nextNode = await this.getNode(nextNodeId);
    await this.updateSessionNode(session, nextNodeId);

    return this.createResponse(nextNode);
  }

  async createResponse(node) {
    switch (node.type) {
      case 'MESSAGE':
        return {
          type: 'text',
          content: node.data.content,
          buttons: node.data.buttons
        };
      case 'QUESTION':
        return {
          type: 'question',
          content: node.data.content,
          options: node.data.buttons
        };
      // Add more response types as needed
    }
  }

  async validateFlow(flow) {
    // Validate start node exists
    if (!flow.nodes.find(n => n.id === flow.startNode)) {
      throw new Error('Start node not found in flow');
    }

    // Validate all edges reference existing nodes
    for (const edge of flow.edges) {
      if (!flow.nodes.find(n => n.id === edge.source)) {
        throw new Error(`Edge source node ${edge.source} not found`);
      }
      if (!flow.nodes.find(n => n.id === edge.target)) {
        throw new Error(`Edge target node ${edge.target} not found`);
      }
    }

    // Validate node types and data
    for (const node of flow.nodes) {
      await this.validateNode(node);
    }
  }

  async validateNode(node) {
    switch (node.type) {
      case 'QUESTION':
        if (!node.data.buttons || node.data.buttons.length === 0) {
          throw new Error(`Question node ${node.id} must have at least one button`);
        }
        if (!node.data.variable) {
          throw new Error(`Question node ${node.id} must have a variable to store response`);
        }
        break;
      case 'CONDITION':
        if (!node.data.conditions || node.data.conditions.length === 0) {
          throw new Error(`Condition node ${node.id} must have at least one condition`);
        }
        break;
      // Add more validations as needed
    }
  }
}


module.exports = ChatbotService;