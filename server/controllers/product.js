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
  console.log(req.body)
  try {
    const { 
      dogName, 
      dogBreed, 
      lifeExpectancy, 
      dogSize, 
      price, 
      description, 
      images, 
      petType, 
      age   
    } = req.body;

    // Validation (optional hai )
    if (
      !dogName || 
      !dogBreed || 
      !lifeExpectancy || 
      !dogSize || 
      !price || 
      !description || 
      !images || 
      !petType || 
      !age   
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Add new pet in data base
    const record = new DogCollection({
      dogName,
      dogBreed,
      lifeExpectancy,
      dogSize,
      price,
      description,
      images,
      petType, // Save petType
      age   // Save petAge
    });

    await record.save();

    return res.status(200).json({
      message: "Pet product successfully added to the database",
    });
  } catch (error) {
    console.error("Error adding pet product:", error); // Log for debugging purposes

    return res.status(500).json({message: "Server error, please try again",
      error: error.message || "Something went wrong on the server",
    });
  }
};




exports.dogFetchProductControler =async (req,res)=>{
  const record=await DogCollection.find()
  res.json({data:record})
}


