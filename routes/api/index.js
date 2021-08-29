const express=require('express');

const router=express.Router();
router.use('/user/perchase',require('./perchase_route'));
router.use('/admin/product',require('./product_route'));
router.use('/user',require('./user_api'));
module.exports =router;