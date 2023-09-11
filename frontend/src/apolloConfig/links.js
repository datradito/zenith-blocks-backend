import { setContext } from "@apollo/client/link/context";
import { from, ApolloLink } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { toast } from 'react-toastify';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { redirect } from "react-router-dom";
import { useDisconnect } from 'wagmi';


const clearAuthData = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('daoId');
};


export const authLink = () => (setContext(async (_, { headers }) => {
    const token = sessionStorage.getItem('authToken');
    // const { disconnectAsync } = useDisconnect();

    if (token) {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        };
    } else {
        // redirect to login
        // await disconnectAsync();
        redirect('/');
    }
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

            if (message === 'UNAUTHENTICATED') {
                toast.error("A GraphQL error occurred.");
                clearAuthData();
            }

            if (message === 'AUTH_REQUIRED') {
                clearAuthData();
            }

            toast.error(message);
        });
    
    if (networkError) console.log(`[Network error]: ${networkError}`);

    // if (networkError.statusCode === 401) redirect('/');
});

export const httpLink = () => (createHttpLink({
    uri: 'http://localhost:8080/graphql',
}));

const retryIf = (error, operation) => {
    if (error.statusCode) {
        const doNotRetryCodes = [400, 401, 403, 500];
        clearAuthData();
        return !doNotRetryCodes.includes(error.statusCode);
    }

    if (error.graphQLErrors) {
        for (let graphQLError of error.graphQLErrors) {
            // Customize conditions based on your needs
            if (graphQLError.extensions?.code === 'UNAUTHENTICATED' ||
                graphQLError.extensions?.code === 'BAD_USER_INPUT') {
                clearAuthData();
                return false;
            }
        }
    }
    return true;
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
