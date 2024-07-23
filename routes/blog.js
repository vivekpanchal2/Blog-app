const { Router } = require("express");
const router = Router();
const multer = require("multer");
const Blog = require("../models/blog");
const path = require("path");
const Comment = require("../models/comment");

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
  res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  res.render("blog", { user: req.user, blog, comments });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  console.log(blog);
  return res.redirect(`/`);
});

router.post("/comment/:blogId", async (req, res) => {
  const { content } = req.body;
  console.log(req.params.blogId);

  const comment = await Comment.create({
    content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  console.log(comment);
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
