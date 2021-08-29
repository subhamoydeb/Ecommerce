const Product = require('../models/product');
module.exports.CreateProduct = async (req, res) => {
    try {
        const { sku, name, description, category, brand, price, productStatus,quantity } = req.body;
        if (!(sku && name && category && brand && price && productStatus)) {
            res.status(400).send("All input is required");
        }
        const ProductCheck = await Product.findOne({ sku });
        if (ProductCheck) {
            return res.status(409).send("Product Sku is already exist. Please set a unique sku");
        }
        const product = await Product.create({
            sku, name, description, category, brand, price, productStatus
        });
        res.status(201).json({
            status: true,
            message: 'Product Created Successfully',
            results: product
        })
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.ListAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({
            productStatus: 1  // active = 1 ,deactive = 0
        });
        return res.status(201).json({
            status: true,
            message: 'All Product list',
            results: allProducts
        })
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.GetProduct = async (req, res) => {
    try {
        const ProductData = await Product.findOne({ _id: req.params.ProductId, productStatus: 1 });
        if (!ProductData) {
            return res.status(409).json({
                status: false,
                message: 'No Data Found',
                results: []
            });

        }
        return res.status(202).json({
            status: true,
            message: 'Data Found Successfully',
            results: ProductData
        });
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.EditProduct = async (req,res)=>{
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!updateProduct) {
            return res.json(400).json({ success: false, status: "404" });
          }
      
        
         return  res.status(201)
            .json({
              status: true,
              message: "Your Product has been successfully updated.",
              data: updateProduct,
            });
    }
    catch(error){
        console.log(error);
    }
}
module.exports.DeleteProduct = async (req,res)=>{
    try{
        const DeleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!DeleteProduct) {
          return res
            .status(400)
            .json({ success: true, message: "Product not found" });
        }
    
        res
          .status(201)
          .json({
            success: true,
            message: "Your Product has been successfully deleted.",
            data: {},
          });
    }
    catch(error){
        console.log(error);
    }
}