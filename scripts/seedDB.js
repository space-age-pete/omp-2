const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/openmiclist");

const micSeed = [
  {
    micName: "Parked Car Mic",
    locationName: "Doolie's",
    address: "67 Scenic Point Drive",
    signUpTime: "6:30",
    startTime: "7:00",
    day: "Monday"
  },
  {
    micName: "Laugh Town Open Mic",
    locationName: "The Cockpit",
    address: "5406 Savign Avenue",
    signUpTime: "7:30",
    startTime: "8:00",
    day: "Monday"
  },
  {
    micName: "Kookie Bar Mic Night",
    locationName: "Kookie Bar",
    address: "3 Kookie Court",
    signUpTime: "8:30",
    startTime: "9:00",
    day: "Tuesday"
  }
];

db.Mic.remove({})
  .then(() => db.Mic.collection.insertMany(micSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
