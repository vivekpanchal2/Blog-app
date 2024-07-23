require("dotenv").config();

const express = require("express");

const PORT = process.env.PORT || 3000;
const path = require("path");
const app = express();
const userRoute = require("./routes/user");
const { mongoose } = require("mongoose");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
