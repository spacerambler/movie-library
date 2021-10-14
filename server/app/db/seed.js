import client from "./client.js";
import User from "../models/User.js";

client
  .connect()
  .then(() => {
      User.deleteMany({})
  })
    .then(() => 
    Promise.all([
      User.create({
        name: "Tyler",
       email: "tylaw93@yahoo.com",
       password: "12345",
       movies: [
        {
          rating: 5,
          tags: ["Horror", "Action"],
          tmdbId: "550988"
        },
        {
          rating: 5,
          tags: ["Comedy", "Action"],
          tmdbId: "580489"
        }
      ],
      }),
      User.create({
        name: "Elijah",
        email: "eholt@testmail.com",
        password: "password12345",
      }),
    ])
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  })
  .finally(() => {
    console.log("🗃️ 🌱");
    client.close();
  }))