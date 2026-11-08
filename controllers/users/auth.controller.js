
const Users = require("../../models/users/user.model")
const ApiError = require("../../utils/ApiError")
const ApiResponse = require("../../utils/ApiResponse");
const Badrequest = require("../../utils/Badrequest");
const Conflict = require("../../utils/Conflict");

//Register controller
const registerController = async(req, res, next)=>{
      try {
        const{name, email, password, phone} = req.body;

          if(!name  || !email || !password || !phone){
              return next(new Badrequest('All fields required'))
          }

          const isEmailAlredy = await Users.findOne({email: email})
          
          if(isEmailAlredy){
             return next(new Conflict(`email is already exists`))
          }

          const user = await Users.create(req.body);

          //jwt token create
          const accessToken = user.createJWT();
          const refreshToken = user.createJWT();

          //AccessToken
          res.cookie('accessToken', accessToken, {
             httpOnly: true,
             secure: true,
             sameSite: 'strict',
             maxAge: '15m'
          })   
     

          //refreshToken
            res.cookie('refreshToken', refreshToken, {
             httpOnly: process.env.NODE_ENV ==="production",
             secure: true,
             sameSite: 'strict',
             maxAge: '7d'
          }) 

         const data = {
               message: "user register successfully",
               success: true
         }
         const response = new ApiResponse(200, data, "Success");
         res.status(200).json(response)
      } catch (error) {
         return next(error)
      }
}



//login controller
const loginController = async(req, res, next)=>{
        try {
            const user = {
                   message: "login successfuly",
                   success: true
            }

            const response = new ApiResponse(200, user, "Success");

            res.status(200).json(response)

        } catch (error) {
            return next(error)
        }
}


//refresh controller


//logout controller


module.exports = {registerController, loginController} 