// const jwt = require('jsonwebtoken');
// const { AuthenticationError } = require('apollo-server')

import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const JWT_SECRET = process.env.JWT_SECRET;


const signJWTToken = async ({ userAddress, dao }) => {

    const token = await jwt.sign(
      {
        daoId: dao,
        address: userAddress,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3600000" }
    );

    return token;
};
const checkAuth = (context) => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, JWT_SECRET)
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired Token')
            }
        }
        throw new Error('Authentication error is not formatted as Bearer [token]')
    }
    throw new Error('Authorization header is not provided')
}

export { signJWTToken, checkAuth };