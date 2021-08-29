const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    sku:{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    productStatus:{
        type:Boolean,
        required:true
    },
   
},{
    timestamps:true
});

module.exports = Item = mongoose.model('Product',ItemSchema);