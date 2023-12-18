import jwt from 'jsonwebtoken';
import { throwCustomError, ErrorTypes } from '../errorHandlerHelpers/errorHandlerHelper.js';

const getUser = async (token) => {
    try {
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            // console.log('user: ', user);
            return user;
        }
        return null;
    } catch (error) {
        return null;
    }
};

const context = async ({ req, res }) => {
    if (req.body.operationName === 'IntrospectionQuery') {
        return {};
    }

    const headers = req.headers.authorization || '';
    const token = headers.split('Bearer ')[1];
    const user = await getUser(token);

    if (!user) {
        throwCustomError('Please re-connect your wallet', ErrorTypes.UNAUTHENTICATED);
    }
    return { user };
};

export default context;