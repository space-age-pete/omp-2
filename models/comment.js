const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  timeStamp: { type: Date, required: true }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
