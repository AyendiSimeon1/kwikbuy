const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/user.js');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
const { ApolloServer } = require('apollo-server');
const { ApolloError } = require('apollo-server-express');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const WhatsAppService = require('../../services/whatsapp.js')
const resolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) {
                return null;
            }
            return await User.findById(user.id);
        }
    },
    Mutation: {
        signup: async (_, { email, username, password }) => {
            try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                  return {
                    errorMessage: 'User does not exist',
                    errorCode: 501
                  };
                }

                const hashedPassword = await bcrypt.hash(password, 12);

                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword,
                });

                await newUser.save();

                const token = jwt.sign(
                    { userId: newUser._id },
                    secretKey,
                    { expiresIn: '7d' }
                );
                return {
                    token,
                    user: newUser
                };
            } catch (err) {
                console.error(err);
                return { error: "An error occurred", code: "SERVER_ERROR" };
            }
        },
        login: async (_, { email, password }) => {
            try {
             
    
              const user = await User.findOne({ email: email.toLowerCase().trim() });
              if (!user) {
                return {
                    errorMessage: 'User does not exist',
                    errorCode: 501
                  };
              }
       
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                return {
                    errorMessage: 'The password is incorrect',
                    errorCode: 502
                  };
              }
        
   
              const token = jwt.sign(
                { 
                  id: user.id,
                  email: user.email
                }, 
                secretKey, 
                { 
                  expiresIn: '1h',
                  algorithm: 'HS256'
                }
              );
        
              return {
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  username: user.username
                },
                errorMessage: null,
                errorCode: null
              };
        
            } catch (error) {
             
              console.error('Login error:', error);
        
              return {
                errorMessage: 'An internal error occurred',
                errorCode: 'INTERNAL_SERVER_ERROR'
              };
            }
          },
          createTemplate: async (_, { input }) => {
            const whatsAppService = new WhatsAppService();
            
            try {
              const result = await whatsAppService.createMessageTemplate(input);
              if (result.success) {
                return {
                  id: result.templateData.id, // adjust according to response structure
                  status: 'Template created successfully',
                  message: 'Success',
                };
              } else {
                return {
                  success: false,
                  error: result.error,
                  errorCode: result.errorCode,
                };
              }
            } catch (error) {
              console.error("Error in createTemplate:", error);
              throw new ApolloError('Failed to create WhatsApp template');
            }
          },
       
    }
};

module.exports = resolvers;
