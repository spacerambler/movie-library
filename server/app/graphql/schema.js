import { gql } from "apollo-server-express";

export default gql`
  input User {
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
  type Query {
    movies: [Movie]!
  }
  type Mutation {
    createUser(newUser: User): User
    updateMovie(movieID: ID!, tags: [String], rating: Int): Movie
  }
`;
