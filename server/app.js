require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());  // This will parse JSON data from the client (React)

const router = require('./routes/api');
app.use('/api', router);

// MongoDB connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Database connected successfully❤️💙q ');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectToDatabase();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running ╰(*°▽°*)╯`);
  });
};

startServer();
