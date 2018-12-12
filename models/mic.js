const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const micSchema = new Schema({
  micName: { type: String, required: true },
  locationName: { type: String, required: true },
  address: { type: String, required: true },
  signUpTime: { type: String, required: true },
  startTime: { type: String, required: true },
  day: { type: String, required: true },
  slotLength: Number,
  host: String,
  website: String,
  phone: String,
  additionalInfo: String,
  date: { type: Date, default: Date.now }
});

const Mic = mongoose.model("Mic", micSchema);

module.exports = Mic;
