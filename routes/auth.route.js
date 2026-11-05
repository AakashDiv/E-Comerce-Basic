
const express = require("express");
const route = express.Router();

const {registerController, loginController} = require("../controllers/users/auth.controller");



 route.post("/register", registerController)
 route.post("/login", loginController)

module.exports = route