import React from "react";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { token } from "./resources/token";

export const ApolloContext = React.createContext();

const remoteUrl = "localhost:8080";
//process.env.NODE_ENV === "production" ? "localhost:8080" : "localhost:10000";
console.log("Connecting to remote url: " + remoteUrl);

/**
 * Gives access to client to function AND class component
 */
export class ApolloContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.addHeadersToClient = this.addHeadersToClient.bind(this);
    const auth = localStorage.getItem(token);
    this.state = {
      client: new ApolloClient({
        link: getLink(auth ? { authorization: auth } : {}),
        cache: new InMemoryCache()
      }),
      cb: this.addHeadersToClient
    };
  }

  addHeadersToClient(headers) {
    const defaultOptions = {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore"
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all"
      }
    };
    this.setState({
      ...this.state,
      client: new ApolloClient({
        link: getLink(headers),
        cache: new InMemoryCache(),
        defaultOptions
      })
    });
    console.log("Changed client to include the following header:");
    console.log(headers);
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
      reconnect: true,
      connectionParams: headers
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
