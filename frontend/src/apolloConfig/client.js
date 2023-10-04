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
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});