const express = require("express");
const Blog = require("../Models/blog.model");
const User = require("../Models/user.model");
const blogRouter = express();

blogRouter.post("/createBlog", async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.body);
    const userId = req.userId;

    const blog = new Blog({
      title,
      content,
      userId,
    });
    await blog.save();
    res.status(201).json({ blog, message: "Blog Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
blogRouter.get("/getBlogs", async (req, res) => {
  try {
    const userId = req.userId;
    const blogs = await Blog.find({ userId });
    res.status(201).json({ blogs, message: "Blog Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
blogRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
blogRouter.delete("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    console.log(blog.userId.toString());
    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You are not the owner of this blog" });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ msg: "blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = blogRouter;
