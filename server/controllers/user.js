const regCollection = require('../model/userModel');
const { jwtAuthMiddleware, generateToken } = require('../Auth/jwt');

// User Registration Controller
exports.RegestrationUserData = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

   
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // if email kis alraedy regester send error
    const existingUser = await regCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // save data in data  base 
    const record = new regCollection({
      fullName,
      email,
      password, 
    });

    const response = await record.save();

    // jwt token payload token
    const payload = {
      id: response.id,
      email: response.email,
    };

    // Genrate jwt token
    const token = generateToken(payload);

  
    return res.status(201).json({
      token: token,
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
    let passCheck = await regCollection.findOne({password:userPass})  /// passcheck use for only admin password checking 
    if(!userCheck){

      return res.status(400).json({message:"Email not found"})
    }
        // admin password check 
        if(userCheck.email==="vishu@admin.com"){
              if(passCheck.password === "123"){
                      console.log("this is admin 😘")
                return res.json({LoginUser:"Admin" , data: "admin", message: "Admin successfully logged in" });
              }else {
                //  if admin password is worng
                return res.status(400).json({  message: "Incorrect admin password" }); }
          }
        /// checkn user passwrod 
      if(userCheck.password !==userPass){
        return res.status(400).json({message:"Incorrect password"})
      }
res.json({ LoginUser: "Consumer" , data:userCheck,message:"Successfully logged in"})


  }catch(error){
        res.status(500).json({message:"Login failed. Please try again later"})
  }



}