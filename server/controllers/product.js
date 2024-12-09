require('dotenv').config();
const DogCollection =require('../model/dogModel')
const PetProductCollection = require('../model/petProductModel')


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
  try{
    res.json({data:record})

  }catch(error){
      return res.status(500).json({message:"Server error Please Try again", error:error.message || "Something Went Wrong On the server"})
  }

}

////DELET pET code here 
exports.dogDeleteProduct = async(req,res)=>{
  const id = req.params.id;
console.log(id)
  
  try {
      const result = await DogCollection.findByIdAndDelete(id);
      if (!result) {
          return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Successfully deleted product" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
  }
};
///singleProduct Show Case
exports.SingleProductGet= async (req,res) =>{
  const id = req.params.id;
      try{
        const result = await DogCollection.findById(id)
        if(!result){
          return res.status(404).json({message:"Server Error "})
        }   res.json({data:result})
      
      }catch(error){
        res.status(500).json({message:"Error Server Crash"})
      }
}
exports.GetpetdataControler= async(req,res) =>{  ////get pet data in updatepetdata compo 
  const id  = req.params.id; 
    try{
      const result =   await DogCollection.findById(id)
          if(!result)
          {
           return res.status(400).json({message:"Server Error "})
          }
      res.json({data:result})
    }catch(error){
          res.status(500).json({message:"error server Crash"})
    }
}


exports.UpdatePetDetails= async(req,res)=>{
  const id = req.params.id
  console.log(req.body)
  try{
    const { dogName , dogBreed,lifeExpectancy,dogSize ,price, description,petType, age} = req.body
      const record = await DogCollection.findByIdAndUpdate(id, {
        dogName:dogName,
        dogBreed :dogBreed,
        lifeExpectancy : lifeExpectancy,
        dogSize :dogSize,
        price:price,
        description:description,
        petType:petType, 
        age:age 
      })
      res.json({message:"Successfully Update data.."})
  
  }catch(error){

  }
}
/////////////////pet Product section ////////////////
exports.PetProduct = async(req,res) =>{
console.log(req.body)
        try{
  const  {
    category ,
    petCategory,
    productName ,
     productDescription, 
     productSize,
     productPrice,
     productType,
     netQuantity,
     countryOfOrigin,
     brand,
     marketingBy,
     images} =req.body  
    
     const record = new PetProductCollection({
      category ,
      petCategory,
      productName ,
       productDescription, 
       productSize,
       productPrice,
       productType,
       netQuantity,
       countryOfOrigin,
       brand,
       marketingBy,
       images
     })
await record.save()
  return res.status(200).json({message:"saved successfully"})
        }catch(error){
              return res.status(500).json({message:"server Crash or internal error"})
        }
}

exports.petproductfetching = async (req, res) => {
  try {
    const records = await PetProductCollection.find(); // Fetch all records
    res.status(200).json({ data: records }); // Send the records as a response
  } catch (error) {
    console.error('Error fetching pet products:', error);
    res.status(500).json({ message: 'Internal server error' }); // Handle errors
  }
};
exports.SinglePetProductSection = async(req,res)=>{
 const {id} = req.params

try{
  const  record =await PetProductCollection.findById(id)
        res.status(200).json({data:record})
}catch(error){
  res.status(500).json({message:"Internal Server error"})
}
}
