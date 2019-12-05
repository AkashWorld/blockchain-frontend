import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RouterComponent } from "./router";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

/**URL for the backend server, this changes from 10000 for normal
 * development to 8080 for production (will change as we change to a real backend
 * server on AWS)
 */
// const remoteUrl =
//   // eslint-disable-next-line no-undef
//   process.env.NODE_ENV === "production"
//     ? "http://localhost:8080"
//     : "http://localhost:10000";

const remoteUrl = "http://localhost:8080";

console.log(`Listening to address ${remoteUrl}/graphql for GraphQL`);

/**Apollo Client that we use to query the backend GraphQL
 * https://www.apollographql.com/docs/react/get-started/
 */
const token = localStorage.getItem("token");
const headers = {
  authorization: token ? `${token}` : null
};
const client = new ApolloClient({ uri: `${remoteUrl}/graphql`, headers });

ReactDOM.render(
  <ApolloProvider client={client}>
    <RouterComponent />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
