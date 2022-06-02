const express = require("express");
const postRouter = express.Router();
const Post = require("../models/post");
const postSeed = require("../models/seed");
const app = express();

const session = require("express-session");
// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


const User = require("../models/user.js");


postRouter.get("/", (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render("signup.ejs", {
      post: allPosts,

    });
  });
});


postRouter.get("/home", (req, res) => {
console.log(req.session.currentUser)
  Post.find({}, (error, allPosts) => {
    res.render("home.ejs", {
      posts: allPosts,
      user: req.session.currentUser
    });
  });
});

postRouter.get("/profile", (req, res) => {
  console.log(req.session.currentUser);

  Post.find({}, (error, allPosts) => {
    res.render("profile.ejs", {
      posts: allPosts,
      user: req.session.currentUser,
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
  res.render("postnew.ejs", {
    user: req.session.currentUser,
  });
});

postRouter.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render("edit.ejs", {
      post: foundPost,
    });
  });
});


postRouter.post("/", (req, res) => {
  Post.create(req.body, (error, createdPost) => {
    console.log(createdPost)
    req.session.currentUser.posts.push(createdPost)
    console.log(req.session.currentUser.posts);
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


postRouter.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatePost) => {
      res.redirect("/posts/home");
    }
  );
});

module.exports = postRouter;
