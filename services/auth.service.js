
const JWT = require("jsonwebtoken");

const createJWTToken = (user, secretKey, expireTime)=>{
      const token =  JWT.sign(
            {userId: user._id, role: user.role},
            secretKey,
            {expiresIn: expireTime }
        
        )

        return token
}


const createAccessToken = (user)=>{
    const token =  createJWTToken(user, process.env.ACCESS_TOKEN_SECRET,  process.env.ACCESS_TOKEN_EXPIRE) 
    return token
}


const createRefreshToken = (user)=>{
   const token =  createJWTToken(user, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRE ) 
    return token
  
}



module.exports = {
    createAccessToken,
    createRefreshToken
}