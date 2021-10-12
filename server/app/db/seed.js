import client from "./client.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

client
  .connect()
  .then(() => {
    Promise.all([
      Movie.deleteMany({}),
      User.deleteMany({}),
    ]);
  })
  .then(() => { 
    Movie.insertMany([
      {
        rating: 5,
        tags: ["Horror", "Action"],
        tmdbId: ""
      },
      {
        rating: 5,
        tags: ["Comedy", "Action"],
        tmdbId: ""
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