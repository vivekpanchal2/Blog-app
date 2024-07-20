const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
