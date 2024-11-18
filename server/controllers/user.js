const regCollection = require('../model/userModel');

// User Registration controler
exports.RegestrationUserData = async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // Log the request body

    // Destructure the body data from the request
    const { fullName, email, password } = req.body;

    // Validate input data (optional)
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new user record in the database
    const record = new regCollection({
      fullName,
      email,
      password,
    });

    // Save the new user record to the database
    await record.save();

    // Respond back to the client with a success message
    return res.status(200).json({
      message: "User registered successfully",
      userData: { fullName, email },  
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};


//// userLogin controller
exports.loginDataControler= async(req,res)=>{
   
  try{
    const {userId, userPass}=req.body
    let userCheck =await regCollection.findOne({email:userId})
      if(!userCheck){
        return res.status(400).json({message:"Email not found"})

      }
        /// check if userpassword
      if(userCheck.password !==userPass){
        return res.status(400).json({message:"Incorrect password"})
      }

res.json({data:userCheck,message:"Successfully logged in"})


  }catch(error){
        res.status(500).json({message:"Login failed. Please try again later"})
  }



}