
const express = require("express");
const route = express.Router();

const authenticate = require("../middlewares/authenticate")
const {registerController, loginController, refreshTokenController, logoutController} = require("../controllers/users/auth.controller");


//public route
 route.post("/register",  registerController)
 route.post("/login",  loginController)


 // Protected routes
route.post("/logout", authenticate, logoutController);
route.post("/refresh-token", refreshTokenController);

module.exports = route