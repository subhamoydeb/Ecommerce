const express=require('express');
const router=express.Router();
const PassPortUser = require('../../middleware/passport-user')
// all product purchase route here
const PerchaseController = require('../../controller/PerchaseController');
router.post('/user/create-order',PassPortUser.authenticate('user-role',{session:false}),PerchaseController.CreateOrder);



module.exports = router;