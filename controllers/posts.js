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
postRouter.get("/home", (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render("home.ejs", {
      posts: allPosts,
    });
  });
});

// seed data
postRouter.get("/home/seed", (req, res) => {
  Post.deleteMany({}, (error, allPosts) => {});

  Post.create(postSeed, (error, data) => {
    res.redirect("/posts/home");
  });
});
// create

postRouter.get("/newpost", (req, res) => {
  res.render("postnew.ejs");
});

postRouter.post("/", (req, res) => {
  // order products
  Post.create(req.body, (error, createdPost) => {
    res.redirect("/posts/home");
  });
});
// handle like count
let liked = false;
postRouter.post("/:id/like", (req, res) => {
  Post.findById(req.params.id, (err, data) => {
    if(liked === true){
 data.likes--
 liked = false
    }else{
        data.likes++;
         liked = true;
    }
      
      data.save();
    

    res.redirect(`/posts/home`);
  });
});

postRouter.delete("/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, deletedPosts) => {
    // res.send({ success: true });
    res.redirect("/posts/home");
  });
});

module.exports = postRouter;
