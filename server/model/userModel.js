const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const jwt = require("jsonwebtoken");

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
}, { timestamps: true });

// Corrected method name and syntax
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET);
};

const regCollection = model('User', userSchema);

module.exports = regCollection;