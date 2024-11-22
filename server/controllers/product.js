require('dotenv').config();
const DogCollection =require('../model/dogModel')


const cloudinary = require('cloudinary').v2;  // Import Cloudinary
cloudinary.config({ 
  cloud_name: 'dishdojeh', 
  api_key: process.env.cloud_api_key, 
  api_secret: 'jjdqa4FjQ2TaTxSaQzSEiUPzhHA' 
});


// Controller to handle dog product creation
exports.dogProductController = async (req, res) => {
  try {
    const { dogName, dogBreed, lifeExpectancy, dogSize, price, description, images } = req.body;

    // Validation (optional hai )
    if (!dogName || !dogBreed || !lifeExpectancy || !dogSize || !price || !description || !images) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Add new dog in data base
    const record = new DogCollection({
      dogName,
      dogBreed,
      lifeExpectancy,
      dogSize,
      price,
      description,
      images,
    });

    await record.save();

    return res.status(200).json({
      message: "Dog product successfully added to the database",
    });
  } catch (error) {
    return res.status(500).json({message: "Server error, please try again",error: error.message,
    });
  }
};
