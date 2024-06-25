const Blog = require("../models/blog");
const Comment = require("../models/comment");
const handleGetBlogs = (req, res) => {
  return res.render("addBlog", { user: req.user });
};

const handleGetBlogsById = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  res.render("blog", { blog, user: req.user, comments });
};

module.exports = {
  handleGetBlogs,
  handleGetBlogsById,
};
