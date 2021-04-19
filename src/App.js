import logo from './logo.svg';
import './App.css';
import Amplify from "aws-amplify";
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import {  ApolloProvider, ApolloClient, ApolloLink, InMemoryCache, gql, useQuery } from '@apollo/client';




const config = {
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  region: process.env.REACT_APP_AWS_REGION,
  auth: {
    type: process.env.REACT_APP_AUTH_TYPE,
    apiKey: process.env.REACT_APP_APPSYNC_API_KEY
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(config),
    createSubscriptionHandshakeLink(config)
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});

const testQuery = gql`
  query all {
    all(limit: 10, nextToken: "") {
    items {
      itemsId
      name
    }
    nextToken
  }
  }
`;


function App() {
  const { loading, error, data } = useQuery(testQuery);
  console.log("data", data)
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
