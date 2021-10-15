import Movie from "./Movie.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "../config.js"


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
userSchema.pre(
  "save",

  // ⚠️ Need to use arrow function to preserve 'this' context
  async function (next) {
    // ⚠️ Don't do this unnecessarily!
    if (this.isNew || this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, config.saltRounds);
    }

    next();
  }
);

userSchema.methods.validatePassword =
  // ⚠️ STILL Need to use arrow function to preserve 'this' context
  function (password) {
    return bcrypt.compare(password, this.password);
  };
export default mongoose.model("User", userSchema);

