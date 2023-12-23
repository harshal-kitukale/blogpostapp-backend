const express = require("express");
const User = require("../Models/user.model");
const Blog = require("../Models/blog.model");
const adminRouter = express();

adminRouter.get("/allusers", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users) {
      res.status(200).json({ msg: "No User Found" });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
adminRouter.get("/allblogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      res.status(200).json({ msg: "No User Found" });
    } else {
      res.status(200).json(blogs);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
adminRouter.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deleteUser = await User.findByIdAndDelete({ _id: userId });
    if (!deleteUser) {
      return res.status(200).json({ msg: "No User Found" });
    }

    const deleteBlogs = await Blog.deleteMany({ userId: userId });

    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

adminRouter.delete("/blog/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(200).json({ msg: "No blog Found" });
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ msg: "blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = adminRouter;
