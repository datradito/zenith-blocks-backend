import { setContext } from "@apollo/client/link/context";
import { from, ApolloLink } from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import { toast } from "react-hot-toast";
import { RetryLink } from "@apollo/client/link/retry";
import { onError } from "@apollo/client/link/error";

import useAuthStore from "../../store/modules/auth/index.ts";

export const authLink = () =>
  setContext(async (_, { headers }) => {
    const { isAuthenticated, logout, user: {authToken}} = useAuthStore.getState();

    if (isAuthenticated) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${authToken}`,
        },
      };
    } else {
      logout();
    }
  });

export const loggerLink = new ApolloLink((operation, forward) => {
  // console.log(`GraphQL Request: ${operation.operationName}`);
  operation.setContext({ start: new Date() });
  return forward(operation).map((response) => {
    //This part don't work
    // const responseTime = new Date() - operation.getContext().start;
    
    // console.log(`GraphQL Response took: ${responseTime}`);
    return response;
  });
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  const {
    logout,
  } = useAuthStore.getState();
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions, locations, path }) => {
      toast.error(message);
      if (extensions?.code === "UNAUTHENTICATED") {
        logout();
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
