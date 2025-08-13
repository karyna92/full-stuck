const{Cart, Product } = require("../models");

  // Get cart by userId
  module.exports.getCartByUser=  async (req, res, next) => {
    try {const userId = req.user.id;
      const cart = await Cart.findOne({ userId }).populate(
        "products.product",
        "products.quantity"
      );

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json({ success: true, cart });
    } catch (error) {
      next(error);
    }
  },

  // Add or update product in cart
  module.exports.addOrUpdateProduct= async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      if (!productId || quantity == null) {
        return res
          .status(400)
          .json({ message: "Product ID and quantity are required" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Find user's cart or create one
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }

      // Check if product is already in cart
      const existingProductIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (existingProductIndex >= 0) {
        cart.products[existingProductIndex].quantity = quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();

      res.status(200).json({ success: true, cart });
    } catch (error) {
      next(error);
    }
  },

  // Remove product from cart
  module.exports.removeProduct=async (req, res, next) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );

      await cart.save();

      res.status(200).json({ success: true, cart });
    } catch (error) {
      next(error);
    }
  },

  // Clear the cart
  module.exports.clearCart=async (req, res, next) => {
    try {
     const userId = req.user.id;

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.products = [];

      await cart.save();

      res.status(200).json({ success: true, cart });
    } catch (error) {
      next(error);
    }
  }

  // module.exports.updateCart = async (req, res, next) => {
//   try {
//     const { userId, productId, quantity } = req.body;
//     const parsedQuantity = Number(quantity);

//     if (!userId || !productId || isNaN(parsedQuantity) || parsedQuantity <= 0) {
//       throw new BadRequestError("Missing or invalid parameters");
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       throw new NotFoundError("User not found");
//     }

//     const existingItem = user.cart.find(
//       (item) => item.product && item.product.toString() === productId
//     );

//     if (existingItem) {
//       existingItem.quantity += parsedQuantity;
//     } else {
//       user.cart.push({ product: productId, quantity: parsedQuantity });
//     }

//     await user.save();
//     res.json(user);
//   } catch (error) {
//     console.error("Add to cart error:", error.message, error.stack);
//     next(error);
//   }
// };

// module.exports.deleteItemFromCart = async (req, res, next) => {
//   try {
//     const { userId, productId } = req.body;
//     console.log(userId, productId);
//     if (!userId || !productId) {
//       throw new BadRequestError("Missing or invalid parameters");
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new NotFoundError("User not found");
//     }
//     const index = user.cart.findIndex(
//       (item) => item.productId.toString() === productId
//     );
//     if (index !== -1) {
//       user.cart.splice(index, 1);
//       await user.save();
//       console.log({ "updated user": user });
//       res.json(user);
//     } else {
//       throw new NotFoundError("Item not found in cart");
//     }
//   } catch (error) {
//     next(error);
//   }
// };
