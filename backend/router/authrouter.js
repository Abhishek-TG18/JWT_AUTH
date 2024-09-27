const express = require('express');
const { signupValidator } = require('../middleware/signupValidator');
const { userSignUp, userSignIn } = require("../controller/userController");
const {signInValidator} = require('../middleware/signInValidator');

const userRoute = express.Router();

userRoute.post("/signup", signupValidator, userSignUp);
userRoute.post("/signin", signInValidator, userSignIn);

module.exports ={

 userRoute
}
 // Correct export
