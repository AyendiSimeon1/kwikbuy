'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

function makeClient() {
  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'same-origin',
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

export const client = makeClient();