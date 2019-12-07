import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

export const ApolloContext = React.createContext();

/**
 * Gives access to client to function AND class component
 */
export class ApolloContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: this.props.client
    };
  }

  componentDidUpdate() {
    this.setState({
      client: this.props.client
    });
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
