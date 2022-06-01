const express = require("express");
const bcrypt = require("bcrypt");
const sessionsRouter = express.Router();
const User = require("../models/user.js");

sessionsRouter.post("/", (req, res) => {
  // Check for an existing user
  User.findOne(
    {
      email: req.body.email,
    },
    (error, foundUser) => {
      // send error message if no user is found
      if (!foundUser) {
        res.send(`Oops! No user with that email address has been registered.`);
      } else {
        // If a user has been found
        // compare the given password with the hashed password we have stored
        const passwordMatches = bcrypt.compareSync(
          req.body.password,
          foundUser.password
        );

        // if the passwords match
        if (passwordMatches) {
          // add the user to our session
          req.session.currentUser = foundUser;

          // redirect back to our home page
          res.redirect("/posts/home");
        } else {
          // if the passwords don't match
          res.send("Oops! Invalid credentials.");
        }
      }
    }
  );
});

// Delete (logout route)

sessionsRouter.delete("/", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/sessions/new");
  });
});
// might need to change redirect 

// New (login page)
sessionsRouter.get("/new", (req, res) => {
  res.render("sessions/signin.ejs", {
    currentUser: req.session.currentUser,
  });
});

module.exports = sessionsRouter;