const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
const blogRoutes = require('./Routes/BlogRoutes'); 
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to MERN Blog');
});

// Middleware
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
