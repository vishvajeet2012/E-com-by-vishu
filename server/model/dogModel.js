const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  dogName: {
    type: String,
    required: true,
    trim: true,
  },
  dogBreed: {
    type: String,
    required: true,
    trim: true,
  },
  lifeExpectancy: {
    type: Number,
    required: true,
  },
  dogSize: {
    type: String,
    required: true,
    enum: ["small", "medium", "large"], 
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String], // array of imahe url,
    required: true,
  },
  petType: {
    type: String,
    required: true,
    enum: ["dog", "cat", "bird"], // validiton type 
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, 
  },
}, { timestamps: true }); 

const DogCollection = mongoose.model("DogCollection", DogSchema);

module.exports = DogCollection;
