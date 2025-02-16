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
          const hash = await bcrypt.hash(password,10)
    // Save data in the database
    const record = new regCollection({ fullName, email, password :hash} );

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
   if(!userId || !userPass){
     return res.status(400).json({message:"All field are required"})
   }
    const user = await regCollection.findOne({email:userId} ) 
    if(!user){
      return res.status(400).json({message:"Invalid email or password"})
    }     
const isMatch = await bcrypt.compare(userPass, user.password)
if(!isMatch){
  return res.status(400).json({message:"Invalid email or password"})
}
  const token = user.generateAuthToken()
return res.status(200).json({message:"Login succes ", token})

}catch(error){
  console.error("Error during login:", error);
  return res.status(500).json({
    message: "Server error, please try again later.",
    error: error.message,
  })};
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