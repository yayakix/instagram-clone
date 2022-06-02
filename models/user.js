// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, unique: true },
  fullname: { type: String },
  // profileimage: { type: String },
  posts: { type: Array },
  followers: { type: Number, default: 0 },
  profileimage: {
    type: String,
    default:
      "https://images.pexels.com/photos/6898853/pexels-photo-6898853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
});

// User Model
const User = mongoose.model("User", userSchema);

// Export User Model
module.exports = User;
