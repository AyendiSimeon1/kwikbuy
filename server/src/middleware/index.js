const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to use your secret
            req.user = decoded;
        } catch (error) {
            req.user = null; // Set user to null if token verification fails
            console.error('Token verification failed:', error);
        }
    } else {
        req.user = null; // No auth header
    }
    
    next(); // Always call next() to proceed to the next middleware
};

module.exports = authMiddleware;
