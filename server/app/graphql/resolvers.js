const { AuthenticationError } = require('apollo-server-express');
import { User, Movie } from '../models';
const { signToken } = require('../utils/auth');

export default {
  Query: {
    movies: () => Movie.find({})
       
  },
  
  Mutation: {
    newUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    // movieID: async ()
  }
  // TODO: Write mutations that use `context` with JWT.
}
