const { makeExecutableSchema } = require("graphql-tools");
const { graphql } = require("graphql");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolver");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports.serveGraphQLRequest = (args, res) => {
  graphql({
    schema: schema,
    source: args.query,
    operationName: args.operationName,
    variableValues: args.variables
  }).then(response => {
    res.send(response);
  });
};

module.exports.createSubscriptionServer = server => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: "/subscriptions"
    }
  );
};
