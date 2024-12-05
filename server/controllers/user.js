const regCollection = require('../model/userModel');
 
const jwt = require("jsonwebtoken");

exports.RegestrationUserData = async (req, res) => {

  try {
   
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email is already registered
    const existingUser = await regCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Save data in the database
    const record = new regCollection({ fullName, email, password});

    await record.save();

    return res.status(201).json({
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
 




exports.loginDataControler = async (req, res) => {
  try{
    const {userId, userPass}=req.body
    let userCheck =await regCollection.findOne({email:userId})
    let passCheck = await regCollection.findOne({password:userPass})  /// passcheck use for only admin password checking 
    if(!userCheck){

      return res.status(400).json({message:"Email not found"})
    } // admin password check 
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

exports.userInfroGetData =  async(req,res)=>{
   const id = req.params.id
        try{

              const result  = await regCollection.findById(id)
              if(!result) {
              return res.status(400).json({message: "data not found /"})
              }
              res.json({data:result })
        }catch(error){
          res.status(500).json({message:"internal error "})
        }

}



exports.userPasswordChange = async (req, res) => {
  const { id } = req.params; 
  const { password } = req.body; 
  try{
const result = await regCollection.findByIdAndUpdate(id,{
      password:password
})
res.json({message:"password Change"})
}catch(error){
    res.status(500).json({message:"internal server error"})
}
}
exports.userAddress = async (req, res) => {
  const { id } = req.params;

  const { address } = req.body;
  try {
      const user = await regCollection.findByIdAndUpdate(id ,{
        address:address,
      });
      res.json({message:"address update"})

  }catch(error){
     res.status(500).json({message:"internal serverl error"})   
  }

}

exports.userprofileupdate = async(req, res) =>{
  const {id}= req.params
  console.log(id)
  console.log(req.body)
  try{
    const {fullName,email ,profilePicture}=req.body
    const user = await regCollection.findByIdAndUpdate(id,{
          fullName:fullName,
          email:email,
          profilePicture:profilePicture

    })
      res.status(200).json( {data:user})
  }catch(error){
res.status(500).json({message:"Internal server Error"})
  }
}