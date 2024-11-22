const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const DogSchema = new Schema({
  dogName: {
    type: String,
    required: true,
  },
  dogBreed: {
    type: String,
    required: true,

  },
  lifeExpectancy: {
    type: String,
    required: true,
  },
    dogSize:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:{
        type:Array,
        required:true,

    }


}, { timestamps: true }); 
const DogCollection = model('DogSale', DogSchema);

module.exports = DogCollection;
