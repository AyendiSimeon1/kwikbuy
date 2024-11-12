require('dotenv').config();

module.exports = {
    whatsapp: {
        WHATSAPP_APP_SECRET: process.env.WHATSAPP_APP_SECRET,
        WHATSAPP_APP_ID: process.env.WHATSAPP_APP_ID,
        WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
        WHATSAPP_WABA_ID: process.env.WHATSAPP_WABA_ID
    }
}

