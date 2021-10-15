import mongoose from "mongoose";
export default mongoose.model( "Movie",
 new mongoose.Schema({
      rating: {
        type: Number,
    },
    tags: {
        type: [String],
        
      },
      tmdbId:{
        type: String
      }
      

}))
