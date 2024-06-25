const { Router } = require("express");
const Blog = require("../models/blog");

const { handleGetBlogs, handleGetBlogsById } = require("../controllers/blog");

const { handlePostComment } = require("../controllers/comment");
const router = Router();

//to upload files using multer package
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", handleGetBlogs);

router.get("/:id", handleGetBlogsById);

router.post("/comment/:blogId", handlePostComment);

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageUrl: `/uploads//${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
