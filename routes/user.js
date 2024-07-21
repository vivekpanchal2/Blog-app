const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  await User.create({
    userName,
    email,
    password,
  });

  res.redirect("/");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "invalid email or password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
