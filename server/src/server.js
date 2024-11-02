const express = require('express');
const cors = require('cors');
const connectDB = require('../src/database/index.js');
const dotenv = require('dotenv');
const typeDefs = require('./graphql/schema/index.js');
const resolvers = require('./graphql/resolvers/index.js');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const helmet = require('helmet');
const compression = require('compression');

const logger = require('./utils/logger');

dotenv.config();


const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message || 'An unexpected error occurred',
    });
};


class App {
    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupApollo();
        // this.setupRoutes();
        this.setupErrorHandling();
    }

    setupMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    async setupApollo() {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => ({
                user: req.user,
            }),
            formatError: (error) => {
                const { message, extensions, locations, path } = error;
                logger.error('GraphQL Error:', {
                    message,
                    locations,
                    path,
                    stack: error.stack
                });
                return new ApolloError(
                    message || 'An unknown error occurred',
                    extensions?.code || 'INTERNAL_SERVER_ERROR',
                    {
                        locations,
                        path,
                        code: extensions?.code || 'INTERNAL_SERVER_ERROR'
                    }
                );
              },
        });

        await server.start();

        this.app.use('/graphql', expressMiddleware(server));
    }

    setupRoutes() {
        this.app.post('/webhook', require('./routes/webhook'));
        this.app.get('/health', (req, res) => {
            res.send('OK');
        });
    }

    setupErrorHandling() {
        this.app.use(errorHandler);
    }

    listen(port) {
        return this.app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
}

connectDB();

const port = process.env.PORT || 4000;
const appInstance = new App();
appInstance.listen(port);
