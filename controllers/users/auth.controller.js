
const { rawListeners } = require("../../app");
const ApiError = require("../../utils/ApiError")
const ApiResponse = require("../../utils/ApiResponse")

//Register controller
const registerController = async(req, res, next)=>{
      try {
         const user = {
               message: "user register successfully",
               success: true
         }
         const response = new ApiResponse(200, user, "Success");
         res.status(200).json(response)
      } catch (error) {
         throw new Error(`failed to register`, error)
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
            throw new Error(`failed to login`, error)
        }
}


//refresh controller


//logout controller


module.exports = {registerController, loginController} 