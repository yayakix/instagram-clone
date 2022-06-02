const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  profileimage: {
    type: String,
    default:
      "https://images.pexels.com/photos/6898853/pexels-photo-6898853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  user: { type: String, required: true },
  caption: String,
  img: String,
  likes: { type: Number, default: 0 },
  comments: Array,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
