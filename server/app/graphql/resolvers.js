import AuthenticationError from "apollo-server-express";
import { User, Movie } from '../models/index.js';
import tokenService from "../utils/auth.js";

export default {
  Query: {
    movies: (_,__, context) => { 
      console.log(context.user)
      return Movie.find({}).exec()}
       
  },
  
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = tokenService.generateToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.validatePassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = tokenService.generateToken({user});
      return { token, user };
    },
    // movieID: async ()
  }
  // TODO: Write mutations that use `context` with JWT.
}
