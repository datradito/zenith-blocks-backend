import { ApolloClient, InMemoryCache } from '@apollo/client';

export const snapShotClient = new ApolloClient({
    uri: 'https://hub.snapshot.org/graphql',
    cache: new InMemoryCache()
});