const { User } = require("../models");
module.exports.updateCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    const parsedQuantity = Number(quantity);

    if (!userId || !productId || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    const user = await User.findById(userId);
    console.log({ "our user": user });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingItem = user.cart.find(
      (item) => item.productId && item.productId.toString() === productId
    );
    

    if (existingItem) {
      existingItem.quantity += parsedQuantity;
    } else {
      user.cart.push({ productId, quantity: parsedQuantity }); 
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Add to cart error:", error.message, error.stack);
    next(error);
  }
};

module.exports.deleteItemFromCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const index = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (index !== -1) {
      user.cart.splice(index, 1);
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    next(error);
  }
};
