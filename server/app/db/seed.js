import client from "./client.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

client
  .connect()
  .then(() => { 
    Movie.insertMany([
      {
        _id: 123,
        rating: 5,
        tags: ["Horror", "Action"]
      },
      {
        _id: 12,
        rating: 5,
        tags: ["Comedy", "Action"]
      }
    ])
    .then((film) => 
    Promise.all([
      User.create({
        name: "Tyler",
       email: "tylaw93@yahoo.com",
       password: "12345",
       movies: [{
         film: [film[0]._id, film[1]._id],
       },
     ],
      }),
      User.create({
        name: "Elijah",
        email: "eholt@testmail.com",
        password: "password12345",
      }),
    ])
  )
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  })
  .finally(() => {
    console.log("🗃️ 🌱");
    client.close();
  });


  })