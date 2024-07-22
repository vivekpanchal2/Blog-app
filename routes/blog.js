const { Router } = require("express");
const router = Router();
const multer = require("multer");
const Blog = require("../models/blog");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.get("/add-blog", async (req, res) => {
  res.render("addBlog", { user: req.user, blogs: allBlogs });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  console.log("yoyoyoy", req.user._id);
  const createdBy = req.user._id;
  const blog = await Blog.create({
    title,
    body,
    createdBy,
    coverImage: `/uploads/${req.file.filename}`,
  });
  console.log(blog);
  return res.redirect(`/`);
});

module.exports = router;
