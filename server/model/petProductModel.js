const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const petProductSchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  petCategory: {
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productSize: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  netQuantity: {
    type: String,
    required: true,
  },
  countryOfOrigin: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  marketingBy: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

const PetProductCollection = model('PetProduct', petProductSchema);
module.exports = PetProductCollection;
