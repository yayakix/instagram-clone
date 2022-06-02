const express = require("express");
const postRouter = express.Router();
const Post = require("../models/post");
const postSeed = require("../models/seed");
const app = express();
// ISSUES
// POSTS PUSHED DO NOT SAVE WHEN SERVER REFRESHES
// EDITING USER PROFILE IMAGE

// IMAGES ONLY SHOWING FOR THOSE WHO ARE ACTUALLY LOGGED IN
// PROFILE IMAGES NOT SAVING TO POST DATABASE
// HOW TO SET PROFILE IMAGE EQUAL TO POST IMAGE 

// how to save not just to session but to mongoose

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


// postRouter.get("/", (req, res) => {
//   Post.find({}, (error, allPosts) => {
//     res.render("signup.ejs", {
//       post: allPosts,
//     });
//   });
// });
// home page GET
postRouter.get("/home", (req, res) => {
  console.log(req.session.currentUser.posts);
  
  Post.find({}, (error, allPosts) => {
    res.render("home.ejs", {
      posts: allPosts,
      user: req.session.currentUser,
    });
  });
});
// GET for profile page
postRouter.get("/profile", (req, res) => {
  console.log(req.session.currentUser);

  Post.find({}, (error, allPosts) => {
    res.render("profile.ejs", {
      posts: allPosts,
      user: req.session.currentUser,
      postnum: 0
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
// create new post GET

postRouter.get("/newpost", (req, res) => {
  res.render("postnew.ejs", {
    user: req.session.currentUser,
  });
});

// GET ROUTE edit caption  
postRouter.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    // is it possible to add another schema request 
    res.render("edit.ejs", {
      post: foundPost,
    });
  });
});

// POST ROUTE new post
postRouter.post("/", (req, res) => {
  Post.create(req.body, (error, createdPost) => {
    console.log("created post: " + createdPost);
    req.session.currentUser.posts.push(createdPost);
    console.log("user is  " + User.updatePost)
    // console.log(req.session.currentUser.posts);
    res.redirect("/posts/home");
  });
});
// handle like count
let liked = false;
postRouter.post("/:id/like", (req, res) => {
  Post.findById(req.params.id, (err, data) => {
    if (liked === true) {
      data.likes--;
      liked = false;
    } else {
      data.likes++;
      liked = true;
    }

    data.save();

    res.redirect(`/posts/home`);
  });
});
// DELETE ROUTE
postRouter.delete("/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, deletedPosts) => {
    // res.send({ success: true });
    res.redirect("/posts/home");
  });
});

// PUT ROUTE edit captions
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

// edit profile data
postRouter.get("/:id/editprofile", (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
      // is it possible to add another schema request
      res.render("editprofile.ejs", {
        user: foundUser,
        // users: req.session.currentUser,
      });
    });

});
// put route edit profile data
postRouter.put("/editprofile/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatePost) => {
      res.redirect("/sessions/new");
    }
  );
});



module.exports = postRouter;
