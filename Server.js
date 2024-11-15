const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
const blogRoutes = require('./Routes/BlogRoutes'); 
require('dotenv').config();
const cors = require('cors');

const app = express();



app.use(cors({
  origin: '*', 
}));

app.get('/', (req, res) => {
  res.send('Welcome to MERN Blog');
});

// Middleware
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,  // 30 seconds timeout
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0',  () => {
  console.log(`Server running on port ${PORT}`);
});
