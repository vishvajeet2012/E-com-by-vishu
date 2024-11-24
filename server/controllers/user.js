const regCollection = require('../model/userModel');

// User Registration controler
exports.RegestrationUserData = async (req, res) => {
  try {
   

    // Destructure the body data 
        const { fullName, email, password } = req.body;

    // Validate input data 
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
        // admin password check 
        if(userCheck.email==="vishu@admin.com"){
              if(userPass === "123"){
                      console.log("this is admin 😘")
                return res.json({LoginUser:"Admin" , data: "admin", message: "Admin successfully logged in" });
              }else {
                //  if admin password is worng
                return res.status(400).json({  message: "Incorrect admin password" }); }
          }

    
        /// check if userpassword
      if(userCheck.password !==userPass){
        return res.status(400).json({message:"Incorrect password"})
      }
res.json({ LoginUser: "Consumer" , data:userCheck,message:"Successfully logged in"})


  }catch(error){
        res.status(500).json({message:"Login failed. Please try again later"})
  }



}