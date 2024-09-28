const express = require('express');
const { signupValidator } = require('../middleware/signupValidator');
const { userSignUp, userSignIn ,getUserDetails,userLogOut} = require("../controller/userController");
const {signInValidator} = require('../middleware/signInValidator');
const {authenticateUser}= require('../middleware/authenticateUser');
const userRoute = express.Router();

userRoute.post("/signup", signupValidator, userSignUp);
userRoute.post("/signin", signInValidator, userSignIn);
userRoute.get("/userData",authenticateUser , getUserDetails);
userRoute.get("/logout",authenticateUser, userLogOut);

module.exports = userRoute;


