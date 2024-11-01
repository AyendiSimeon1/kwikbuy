const express = require('express');
const router = express.Router();
const chatbotService = require('../services/chatbot');

const chatbotServices = new chatbotService();

router.post('/webhook', async (req, res) => {
  try {
    const { entry } = req.body;

    for (const e of entry) {
      for (const change of e.changes) {
        if (change.value.messages) {
          for (const message of change.value.messages) {
            await chatbotServices.handleIncomingMessage(message);
          }
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    logger.error('Webhook processing failed', { error });
    res.sendStatus(500);
  }
});

module.exports = router;