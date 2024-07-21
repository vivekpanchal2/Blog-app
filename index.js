const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const path = require("path");
const app = express();
const userRoute = require("./routes/user");
const { mongoose } = require("mongoose");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const cookieParser = require("cookie-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  console.log(req.user);
  res.render("home", {
    user: req.user,
  });
});

app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
  