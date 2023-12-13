import { ApolloClient, InMemoryCache } from "@apollo/client";
import { links } from "./links";
import { QueryClient } from "@tanstack/react-query";

export const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});


export const snapShotClient = new ApolloClient({
  uri: "https://hub.snapshot.org/graphql",
  cache: new InMemoryCache(),
});

// we store daoId ( dao name ) - based on wallet address in session Storage
// when we run request to snapshot we need the dao id in orcder to know which dao
// but if user/daoId is expired then all requests to snapshot are goin to fail becuase we dont have daoId
// so we need to check if daoId is expired and if it is then we need to redirect user to login page