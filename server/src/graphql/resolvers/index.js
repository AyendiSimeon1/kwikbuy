const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/user.js');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

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
                    throw new Error('User already exists');
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
            } catch (error) {
                console.error(error);
                throw new Error('Error during signup');
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User does not exist');
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error('Invalid password');
                }

                const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

                return {
                    token,
                    user
                };
            } catch (error) {
                console.error(error);
                throw new Error('Error during login');
            }
        },
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
