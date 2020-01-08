const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// Express Init
const app = express();

// Middleware, BodyParser
app.use(express.json());

// Build GraphQL Schema
const schema = buildSchema(`type Query{
 user(id: Int!): Person,
 users(gender: String): [Person]
},
type Person{
  id: Int,
  name: String,
  surname: String,
  gender: String
},
type Mutation{
  updateUser(id: Int!, name: String, surname: String, gender: String): Person,
  deleteUser(id: Int!): [Person]
}
`);

// Root provides a resolver function for each endpoint
const userList = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    gender: "male"
  },
  {
    id: 2,
    name: "Jane",
    surname: "Doe",
    gender: "female"
  },
  {
    id: 3,
    name: "Tony",
    surname: "Stark",
    gender: "male"
  },
  {
    id: 4,
    name: "Natasha",
    surname: "Romanoff",
    gender: "female"
  },
  {
    id: 5,
    name: "Wanda",
    surname: "Maximoff",
    gender: "female"
  }
];

function getUser(args) {
  const userId = args.id;
  return userList.filter(({ id }) => id === userId)[0];
}

function getUsers(args) {
  if (args.gender) {
    return userList.filter(({ gender }) => gender === args.gender);
  }

  return userList;
}

function updateUser({ id, name, surname, gender }) {
  let updatedUsers = userList.map(user => {
    if (user.id === id) {
      // update data
      user.gender = gender;
      user.name = name;
      user.surname = surname;

      return user;
    }
    return user;
  });
  return updatedUsers.filter(user => user.id == id)[0];
}

function deleteUser({ id }) {
  return userList.filter(user => user.id !== id);
}

const root = {
  user: getUser,
  users: getUsers,
  updateUser,
  deleteUser
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
