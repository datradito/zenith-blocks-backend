const jwt = require('jsonwebtoken');
// import throwCustomError, {
//     ErrorTypes,
// } from '../helpers/error-handler.helper.js';

const { throwCustomError, ErrorTypes } = require('../errorHandlerHelpers/errorHandlerHelper');

const getUser = async (token) => {
    try {
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            console.log('user: ', user);
            return user;
        }
        return null;
    } catch (error) {
        return null;
    }
};

const context = async ({ req, res }) => {
    // //   console.log(req.body.operationName);
    // if (req.body.operationName === 'IntrospectionQuery') {
    //     // console.log('blocking introspection query..');
    //     return {};
    // }
    // get the user token from the headers
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const user = await getUser(token);

    if (!user) {
        throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
    }

    // add the user to the context
    return { user };
};

module.exports = context;