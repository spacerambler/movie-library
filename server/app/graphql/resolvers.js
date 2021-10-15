/* eslint-disable object-shorthand */
import AuthenticationError from "apollo-server-express";
import { User, Movie } from '../models/index.js';
import tokenService from "../utils/auth.js";

export default {
  Query: {
    getUser: (_,__, context) => User.findById(context.user._id).exec()
    
  },
  
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });

      const token = tokenService.generateToken({user: user});
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
    updateMovie: async (parent, {movieID, rating, tags}) => Movie.updateOne({movieID: movieID}, {$set: {tags: tags}}, {$set: {rating: rating}}) 
     
  // TODO: Write mutations that use `context` with JWT.

}
}
