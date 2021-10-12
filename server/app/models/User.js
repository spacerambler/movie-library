import Movie from "./Movie.js"
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
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

export default mongoose.model("User", userSchema);

