const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


const session = require('express-session');
// Middleware 
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);




mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Routes / Controllers
const postController = require("./controllers/posts");
app.use("/posts", postController);

// Routes / Controllers
const sessionsController = require("./controllers/sessions");
app.use("/sessions", sessionsController);

const userController = require("./controllers/users");
app.use("/users", userController);


// user auth
app.get("/", (req, res) => {
  if (req.session.currentUser) {
    res.render("home.ejs", {
      currentUser: req.session.currentUser,
    });
  } else {
    res.render("explore.ejs", {
      currentUser: req.session.currentUser,
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));
