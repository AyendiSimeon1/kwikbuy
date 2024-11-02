
const winston = require('winston');


const logger = winston.createLogger({
    level: 'info', 
    format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.json() 
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'combined.log' }) // Log all messages to a combined file
    ],
});

logger.error = (message, meta) => {
   
    logger.log('error', message, { meta });
};

module.exports = logger;
