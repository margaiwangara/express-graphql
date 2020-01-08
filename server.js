const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// Express Init
const app = express();

// Middleware, BodyParser
app.use(express.json());

// Build GraphQL Schema
const schema = buildSchema(`type Query, {
  hello: String
}`);

// Root provides a resolver function for each endpoint
const root = {
  hello: () => {
    return "Hello World";
  }
};

// Create Route
app.use(      
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
