const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  score: { type: Number, min: 1, max: 5 },
  timeStamp: { type: Date, required: true }
});

const Rating = mongoose.model("Comment", ratingSchema);

module.exports = Rating;
