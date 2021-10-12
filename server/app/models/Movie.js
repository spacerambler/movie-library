const {Schema, model} = require('mongoose');
import { default as mongoose } from "mongoose";
export default mongoose.model( "Movie",
 new Schema({
    _id: {
        type: Number,
        unique: true
      },
      rating: {
        type: Number,
    },
    tags: {
        type: [String],
        
      },
      

}))
