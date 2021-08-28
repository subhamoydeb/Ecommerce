const express=require('express');

const router=express.Router();


router.use('/user',require('./user_api'));
module.exports =router;