
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
