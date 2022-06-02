const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  profileimage: String,
  user: { type: String, required: true },
  caption: String,
  img: String,
  likes: { type: Number, default: 0 },
  comments: Array,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
