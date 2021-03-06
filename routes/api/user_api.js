const express=require('express');

const router=express.Router();
const userController = require("../../controller/userscontroller");

// user register routes
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/verify-user-email',userController.verifyEmail);


module.exports=router;