const express = require('express');
const Blog = require('../Models/Blog');
const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error: error.message });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog posts', error: error.message });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog post', error: error.message });
  }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error: error.message });
  }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
});

module.exports = router;
