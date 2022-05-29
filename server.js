const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));
