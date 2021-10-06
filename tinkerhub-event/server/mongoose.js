const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://ramnath:" +
    process.env.PASS +
    "@cluster0.07lh9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

mongoose.connection.on("connected", function () {
  console.log("Mongoose Connected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const Users = mongoose.model("users", {
  email: String,
  pass: String,
});

const Events = mongoose.model("events", {
  event: String,
  image: String,
  description: String,
  date: Number,
  location: String,
  max: Number,
  registered: Number,
});

const Registrations = mongoose.model("registrations", {
  event: String,
  name: String,
  email: String,
  phone: String,
  branch: String,
  year: String,
});

module.exports = { Users, Events, Registrations };
