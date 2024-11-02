'use client';

import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', 
  cache: new InMemoryCache(),
});



export default client;
