
const express = require("express");
const route = express.Router();

const authenticate = require("../middlewares/authenticate")
const {registerController, loginController} = require("../controllers/users/auth.controller");



 route.post("/register", authenticate, registerController)
 route.post("/login", authenticate, loginController)

module.exports = route