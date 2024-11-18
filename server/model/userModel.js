const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the schema for user registration
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Enforce unique email addresses
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Timestamps for createdAt/updatedAt fields

// Create the model based on the schema
const regCollection = model('User', userSchema);

module.exports = regCollection;
