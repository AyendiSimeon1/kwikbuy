
const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
    level: 'info', // Minimum level of messages to log
    format: winston.format.combine(
        winston.format.timestamp(), // Include timestamp in log messages
        winston.format.json() // Log messages in JSON format
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'combined.log' }) // Log all messages to a combined file
    ],
});

// Error logging function
logger.error = (message, meta) => {
    // Log the error message and metadata
    logger.log('error', message, { meta });
};

module.exports = logger;
