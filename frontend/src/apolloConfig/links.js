import { setContext } from "@apollo/client/link/context";
import { from, ApolloLink } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
// import ApolloLinkTimeout from '@apollo/client/link/timeout';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { redirect } from "react-router-dom";

export const authLink = () => (setContext(async (_, { headers }) => {
    const token = sessionStorage.getItem('authToken');

    if (token) {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        };
    } else {
        // redirect to login
        redirect('/');
        
    }
    // return {
    //     headers: {
    //         ...headers,
    //         Authorization: token ? `Bearer ${token}` : "",
    //     },
    // };
}));

export const loggerLink = new ApolloLink((operation, forward) => {
    console.log(`GraphQL Request: ${operation.operationName}`);
    operation.setContext({ start: new Date() });
    return forward(operation).map((response) => {
        const responseTime = new Date() - operation.getContext().start;
        console.log(`GraphQL Response took: ${responseTime}`);
        return response;
    });
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {

    
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, extensions, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            if (extensions.code === 'UNAUTHENTICATED') {
                sessionStorage.removeItem('authToken');
                sessionStorage.removeItem('address');
                sessionStorage.removeItem('daoId');
                console.log("INVALID_TOKEN");
            }

            if (message === 'AUTH_REQUIRED') {
                sessionStorage.removeItem('authToken');
                sessionStorage.removeItem('address');
                sessionStorage.removeItem('daoId');
                // setWalletConnected(false);
                console.log("AUTH_REQUIRED");
            }


        });
    
    if (networkError) console.log(`[Network error]: ${networkError}`);

    if (networkError.statusCode === 401) redirect('/');
});

export const httpLink = () => (createHttpLink({
    uri: 'http://localhost:8080/graphql',
}));

const retryIf = (error, operation) => {
    const doNotRetryCodes = [500, 400];
    return !!error && !doNotRetryCodes.includes(error.statusCode);
};

export const retryLink = new RetryLink({
    delay: {
        initial: 100,
        max: 2000,
        jitter: true,
    },
    attempts: {
        max: 5,
        retryIf,
    },
});

export const links = from([
    loggerLink,
    authLink(),
    retryLink,
    errorLink,
    httpLink(),
]);

