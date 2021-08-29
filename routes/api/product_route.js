const express=require('express');
const router=express.Router();
// import product controller here
const ProductController = require('../../controller/productscontroller');
// authentication middleware
const PassPortAdmin = require('../../middleware/passport-admin');
// Product Related Route Here
router.post('/create-product',PassPortAdmin.authenticate('admin-rule',{session:false}),ProductController.CreateProduct);
router.get('/get-all-products',PassPortAdmin.authenticate('admin-rule',{session:false}),ProductController.ListAllProducts);
router.get('/get-product/:id',PassPortAdmin.authenticate('admin-rule',{session:false}),ProductController.GetProduct);
router.put('/edit/:id',PassPortAdmin.authenticate('admin-rule',{session:false}),ProductController.EditProduct);
router.delete('/delete/:id',PassPortAdmin.authenticate('admin-rule',{session:false}),ProductController.DeleteProduct);

module.exports = router;