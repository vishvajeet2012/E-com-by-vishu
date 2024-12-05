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
    unique: true, 
  }, 
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: '', 
  }
}, { timestamps: true }) 

// Create the model based on the schema
const regCollection = model('User', userSchema);

module.exports = regCollection;
