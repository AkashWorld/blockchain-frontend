/**
 * The purpose of this subdirectory is to provide very rough mocking of the backend GraphQL API
 */
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const http = require("http");
const { serveGraphQLRequest } = require("./graphql");
const { createSubscriptionServer } = require("./graphql");

const app = express();

app.use(cors());

app.use(bodyparser.json());

app.post("/graphql", (req, res) => {
  serveGraphQLRequest(req.body, res);
});

const server = http.createServer(app);

server.listen(10000, () => {
  createSubscriptionServer(server);
  console.log("GraphQL mock server started at port 10000");
});
