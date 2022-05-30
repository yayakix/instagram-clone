const express = require("express");
const postRouter = express.Router();
const Post = require("../models/post");
const postSeed = require("../models/seed");

postRouter.get("/", (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render("signup.ejs", {
      post: allPosts,
    });
    
  });
});
postRouter.get("/signin", (req, res) => {
  res.render("signin.ejs");
});
postRouter.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// seed data
postRouter.get("/seed", (req, res) => {
  Post.deleteMany({}, (error, allPosts) => {});

  Post.create(postSeed, (error, data) => {
    res.redirect("/products");
  });
});
// create


module.exports = postRouter;
