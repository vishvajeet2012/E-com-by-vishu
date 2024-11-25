require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const app = express();

// Middleware to parse JSON and form-urlencoded data
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); 

// Middleware to handle file uploads 
app.use(fileUpload({
  useTempFiles: true, 
}));

// Router
const router = require('./routes/api');
app.use('/api', router);


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully ❤️💙');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit if unable to connect to the database
  }
};

// Start the server
const startServer = async () => {
  await connectToDatabase();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} ╰(*°▽°*)╯`);
  });
};

startServer();
