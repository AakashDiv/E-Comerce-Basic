
const Unauthorized = require("../utils/Unauthorized");
const jwt = require("jsonwebtoken")

const authenticate = async(req, res, next)=>{
     const token = req.cookies.accessToken
     try {
        if(!token){
              return next (new Unauthorized('token is expire or invalid'))
        }

         let decode 

         try {
            decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
         } catch (error) {
            return next(new Unauthorized('token does not verify'))
         }

         req.user = decode.userId;
         
         return next()

     } catch (error) {
        return next(error)
     }
}


module.exports = authenticate