const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const Blog = require("./models/blog");

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

mongoose
  .connect(process.env.MONGO_DB)
  .then((e) => console.log("Connected to DB"));
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
