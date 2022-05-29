const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  caption: String,
  img: String,
  likes: Number,
  comments: Array,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
