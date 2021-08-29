const Perchase = require('../models/perchase');

module.exports.CreateOrder = async (req,res)=>{
    const { productId, quantity, name, price ,sku,category,brand} = req.body;

  const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id

  try {
    let perchase = await Perchase.findOne({ userId });

    if (perchase) {
      //Order exists for user
      let itemIndex = perchase.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the Order, update the quantity
        let productItem = perchase.products[itemIndex];
        productItem.quantity = quantity;
        perchase.products[itemIndex] = productItem;
      } else {
        //product does not exists in Order, add new item
        perchase.products.push({ productId, quantity, name, price,sku,category,brand });
      }
      perchase = await perchase.save();
      return res.status(201).send(perchase);
    } else {
      //no Order for user, create new Order
      const newCart = await Perchase.create({
        userId,
        products: [{ productId, quantity, name, price,sku,category,brand }]
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}