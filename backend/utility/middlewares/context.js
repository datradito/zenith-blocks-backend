const jwt = require('jsonwebtoken');

const { throwCustomError, ErrorTypes } = require('../errorHandlerHelpers/errorHandlerHelper');

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
    // //   console.log(req.body.operationName);
    if (req.body.operationName === 'IntrospectionQuery') {
        // console.log('blocking introspection query..');
        return {};
    }

    const headers = req.headers.authorization || '';
    const token = headers.split('Bearer ')[1];
    const user = await getUser(token);

    if (!user) {
        throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
    }

    // add the user to the context
    return { user };
};

module.exports = context;