const {Schema, model} = require('mongoose');
import Movie from "./Movie.js"

const userSchema= new Schema({
    name: {
        type: String,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
      },
      movies: [Movie.schema]

})

// _id: ID
// name: String
// email: String!
// password: String!
// movies: [Movie]