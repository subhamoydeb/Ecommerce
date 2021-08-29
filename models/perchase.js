const mongoose=require('mongoose');
const perchase = new mongoose.Schema({
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        products: [
          {
            sku:String,
            productId: Number,
            name: String,
            price: Number,
            category:String,
            brand:String,
            quantity:Number
          }
        ],
        active: {
          type: Boolean,
          default: true
        },
        modifiedOn: {
          type: Date,
          default: Date.now
        }
      },
      { timestamps: true }
   );
   const perchaseTable=mongoose.model('Perchase',perchase);
   module.exports=perchaseTable; 