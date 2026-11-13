
const Users = require("../../models/users/user.model");
const Sessions = require("../../models/sessions/session.model")
const { createAccessToken , createRefreshToken} = require("../../services/auth.service");
const ApiError = require("../../utils/ApiError")
const ApiResponse = require("../../utils/ApiResponse");
const Badrequest = require("../../utils/Badrequest");
const Unauthorized = require("../../utils/Unauthorized")
const Conflict = require("../../utils/Conflict");
const JWT = require("jsonwebtoken")

//Register controller
const registerController = async(req, res, next)=>{
      try {
        const{name, email, password, phone, role} = req.body;

          if(!name  || !email || !password || !phone ){
              return next(new Badrequest('All fields required'))
          }

          const isEmailAlredy = await Users.findOne({email: email})
          
          if(isEmailAlredy){
             return next(new Conflict(`email is already exists`))
          }

          const user = await Users.create({
               name: name,
               email: email,
               phone: phone,
               password: password, 
               role: "customer",

          });

          //jwt token create
          const accessToken = await  createAccessToken(user)
          const refreshToken =  await createRefreshToken(user);

          const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; 
          const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

          await Sessions.create({
             user:user._id,
             refreshToken: refreshToken,
             expiredAt: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE),
             isRevoked: false
          })

          //AccessToken
     
           res.cookie('accessToken', accessToken, {
                        httpOnly: true ,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: ACCESS_TOKEN_MAX_AGE
                     })      

            //refreshToken
           
            res.cookie('refreshToken', refreshToken, {
                         httpOnly:  true ,
                         secure: true,
                         sameSite: 'strict',
                         maxAge: REFRESH_TOKEN_MAX_AGE
                      })


         const data = {
               user: user,
               message: "user register successfully",
               success: true,
               
         }
         const response = new ApiResponse(201, data, "Success");
         res.status(201).json(response)
      } catch (error) {
         return next(error)
      }
}



//login controller
const loginController = async(req, res, next)=>{
   
   
   try {
           const {email, password} = req.body

 if(!email || !password){
            return next(new Badrequest('email or passowrd is missing') )
       }
       
       const user = await Users.findOne({email: email}).select('+password');
       
       if(!user){
          return next(new Unauthorized('invalid credentials'))
         }
         
         const isPasswordMatch = await user.comparePassword(password);
       if(!isPasswordMatch){
          return next(new Unauthorized('invalid credentials'))
       }

    //jwt token create
          const accessToken = await  createAccessToken(user)
          const refreshToken =  await createRefreshToken(user);

          const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; 
          const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

           await Sessions.create({
             user:user._id,
             refreshToken: refreshToken,
             expiredAt: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE),
             isRevoked: false
          })

          //AccessToken
          
           res.cookie('accessToken', accessToken, {
                        httpOnly: true ,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: ACCESS_TOKEN_MAX_AGE
                     })      

            //refreshToken
            
            res.cookie('refreshToken', refreshToken, {
                         httpOnly:  true ,
                         secure: true,
                         sameSite: 'strict',
                         maxAge: REFRESH_TOKEN_MAX_AGE
                      })


const safeUser = {
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
};
                      
            const data = {
                user: safeUser,
                   message: "login successfuly",
                   success: true
            }

            const response = new ApiResponse(200, data, "Success");
            res.status(200).json(response)

        } catch (error) {
            return next(error)
        }
}


//refresh controller
const refreshTokenController = async(req, res, next)=>{
       try {
           const refreshToken = req.cookies.refreshToken;
           if(!refreshToken){
              return next(new Unauthorized('missing refresh token'))
           }
           let decode;
          try {
            
            decode =  JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          } catch (error) {
             return next(new Unauthorized('token is invalid or expired'))
          }

           const activeSession = await Sessions.findOne(
            { refreshToken, isRevoked: false, expiredAt: { $gt: new Date() }} )

           if(!activeSession){
            return next(new Unauthorized("session expired or revoked"))
           }

           const user = await Users.findOne({_id: decode.userId})
         
            if(!user){
                  return next(new Unauthorized('user not found'))
            }

     
            const accessToken = await  createAccessToken(user)
             //AccessToken
          const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; 
           res.cookie('accessToken', accessToken, {
                        httpOnly: true ,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: ACCESS_TOKEN_MAX_AGE
                     })  

             const data = {
                 user: user,
                   message: "refreshtoken generate successfuly",
                   success: true
            }

            const response = new ApiResponse(200, data, "Success");
            res.status(200).json(response)


       } catch (error) {
            return next(error)
       }
}

//logout controller
const logoutController = async(req, res, next)=>{
   try {
      const refreshToken = req.cookies.refreshToken

      if(refreshToken){
            await Sessions.findOneAndUpdate({refreshToken, isRevoked: false }, {$set: {isRevoked: true}})
      }

         //AccessToken
         const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; 
           res.clearCookie('accessToken', {
                        httpOnly: true ,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: ACCESS_TOKEN_MAX_AGE
                     })      

            //refreshToken
            res.clearCookie('refreshToken', {
                         httpOnly:  true ,
                         secure: true,
                         sameSite: 'strict',
                      })

                const data = {
                   message: "logout successfuly",
                   success: true
            }

            const response = new ApiResponse(200, data, "Success");
            res.status(200).json(response)

   } catch (error) {
       return next(error)
   }
}

module.exports = {registerController, loginController, refreshTokenController, logoutController} 