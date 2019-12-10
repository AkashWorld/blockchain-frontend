import React from "react";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "apollo-boost";

export const ApolloContext = React.createContext();

const remoteUrl = "localhost:8080";

/**
 * Gives access to client to function AND class component
 */
export class ApolloContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: new ApolloClient({ link: getLink(), cache: new InMemoryCache() })
    };
  }

  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <ApolloContext.Provider value={this.state}>
          {this.props.children}
        </ApolloContext.Provider>
      </ApolloProvider>
    );
  }
}

function getLink(headers) {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: `http://${remoteUrl}/graphql`,
    headers
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `ws://${remoteUrl}/subscriptions`,
    options: {
      reconnect: true
    }
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  return split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
}
