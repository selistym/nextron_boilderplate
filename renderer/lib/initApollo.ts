import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';

import * as Client from '../graphql/client';

let apolloClient: ApolloClient<any> | any = null;

const GRAPHQL_WS_URI = `ws://${process.env.GRAPHQL_URI}`;
const GRAPHQL_HTTP_URI = `http://${process.env.GRAPHQL_URI}`;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

// https://www.apollographql.com/docs/react/advanced/subscriptions
function createConnectionLink() {
  const isBrowser = (process as any).browser;
  let connectionLink;

  const httpLink = new HttpLink({
    uri: GRAPHQL_HTTP_URI,
  });
  connectionLink = httpLink;

  if (isBrowser) {
    const wsLink = new WebSocketLink({
      uri: GRAPHQL_WS_URI,
      options: {
        reconnect: true,
        reconnectionAttempts: 5,
      },
    });

    // FIXME: Auth check.
    connectionLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as any;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    );
  }

  return connectionLink;
}

function create(initialState, { getToken }) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const Cache = new InMemoryCache().restore(initialState || {});
  const connectionLink = createConnectionLink();
  const stateLink = withClientState({
    cache: Cache,
    defaults: Client.Defaults,
    resolvers: Client.Resolvers,
  });

  // https://www.apollographql.com/docs/react/recipes/authentication#header
  // https://www.apollographql.com/docs/link/overview#terminating
  const authLink = new ApolloLink((operation, forward) => {
    const token = getToken();
    operation.setContext((context) => {
      return {
        ...context,
        headers: {
          ...context.headers,
          authorization: token
            ? `Bearer ${token}`
            : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MThkMTU5OS1hZDBhLTQxNzQtYmE4My1kNTEyNzE2MjY4MTQiLCJpYXQiOjE1NTQwOTU2NzQsImV4cCI6MTU1NDY5NTY3NH0.rC0xzVGtgnly6biJXHL7n9bgN1WcukuW_hVx6M2_5a0',
        },
      };
    });

    return forward(operation);
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once).
    link: ApolloLink.from([authLink, stateLink, connectionLink]),
    cache: Cache,
  });
}

export default function initApollo(initialState, options): ApolloClient<any> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
