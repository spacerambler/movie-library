import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: ID
    name: String
    email: String!
    password: String!
    movies: [Movie]
  }
  type Movie {
    _id: ID!
    rating: Int 
    tags: [String]
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    movies: [Movie]!
  }
  type Mutation {
    addUser(
      name: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    updateMovie(movieID: ID!, tags: [String], rating: Int): Movie
  }
`;
