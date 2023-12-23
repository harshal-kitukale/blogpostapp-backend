const mongoose = require("mongoose");
const User = require("./user.model");

const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, require: true },
});
const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
