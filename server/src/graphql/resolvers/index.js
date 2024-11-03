const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/user.js');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
const { ApolloServer } = require('apollo-server');
const { ApolloError } = require('apollo-server-express');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
                     new Error('User already exists');
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
                    errorMessage: 'wrong password',
                    errorCode: 'UINVALID_CREDENTIALS'
                  };
                // throw new ApolloError('Invalid credentials', 'INVALID_CREDENTIALS');
              }
        
              // Generate token
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
        
              // Return success response
              return {
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  // Don't send password or other sensitive fields
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
          }
        // googleLogin: async (_, { token }) => {
        //     try {
        //         const ticket = await client.verifyIdToken({
        //             idToken: token,
        //             audience: process.env.GOOGLE_CLIENT_ID
        //         });

        //         const { email_verified, email, name, picture } = ticket.getPayload();

        //         if (!email_verified) {
        //             throw new Error('Email not verified');
        //         }

        //         let user = await User.findOne({ email });
        //         if (!user) {
        //             user = new User({
        //                 email,
        //                 username: name,
        //                 image: picture
        //             });

        //             await user.save();
        //         }

        //         const jwtToken = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

        //         return {
        //             token: jwtToken,
        //             user
        //         };
        //     } catch (error) {
        //         console.error(error);
        //         throw new Error('Error during Google login');
        //     }
        // }
    }
};

module.exports = resolvers;
