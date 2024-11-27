require('dotenv').config();
const jwt = require('jsonwebtoken');
///  process.env.JWTCODE
// JWT authentication middleware

async function jwtAuth(req,res,next) {

    try{
    const token = req.cookies?.token;
    if(!token){
        return res.status(200).json({
            message:"please login...",
            error:true,
            success:false,
        });
    }
    jwt.verify(token, process.env.JWTCODE,function(err,decoded ) {
        if(err){
            return res.status(401).json({message:"Invalid Token",error:true,success:false})
        }
        req.userId=decoded
        next()
    })

    }catch(err){
                res.status(400).json({
                    message:err.message||"An error occurred during Authentication",
                    data:[],
                    error:true,
                    success:false
                })
            }
    
}

module.exports = jwtAuth;


