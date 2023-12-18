import { setContext } from "@apollo/client/link/context";
import { from, ApolloLink } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { toast } from "react-hot-toast";
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { redirect } from "react-router-dom";


const clearAuthData = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('daoId');
};

const isTokenExpired = (decodedToken) => {
    if (!decodedToken || !decodedToken.exp) {
      return true; 
    }
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("currentTime", currentTime)
    console.log("decodedToken.exp", decodedToken.exp)
    return decodedToken.exp < currentTime;
  };

function decodeToken(token) {
    if (!token) {
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

export const authLink = () => (setContext(async (_, { headers }) => {
    const token = sessionStorage.getItem('authToken');
    const decodedUser = decodeToken(token);


    if (token && !isTokenExpired(decodedUser)) {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        };
    } else {
        clearAuthData();
        redirect('/');
    }
}));

export const loggerLink = new ApolloLink((operation, forward) => {
    // console.log(`GraphQL Request: ${operation.operationName}`);
    operation.setContext({ start: new Date() });
    return forward(operation).map((response) => {
        const responseTime = new Date() - operation.getContext().start;
        // console.log(`GraphQL Response took: ${responseTime}`);
        return response;
    });
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, extensions, locations, path }) => {
            toast.error(message);
            if (extensions?.code === 'UNAUTHENTICATED') {
                clearAuthData();
                redirect('/');
            }
        });
});

export const httpLink = () =>
  createHttpLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
  });

const retryIf = (error) => {
  if (error.statusCode) {
    const doNotRetryCodes = [400, 401, 403, 500];
    return !doNotRetryCodes.includes(error.statusCode);
  }

  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions?.code === "UNAUTHENTICATED" ||
        graphQLError.extensions?.code === "BAD_USER_INPUT"
      ) {
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

