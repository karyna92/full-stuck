const { User, Order, Product } = require("../models");
const path = require("path");
const { NotFoundError, BadRequestError } = require("../errors");

module.exports.updateCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    const parsedQuantity = Number(quantity);

    if (!userId || !productId || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      throw new BadRequestError("Missing or invalid parameters");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const existingItem = user.cart.find(
      (item) => item.product && item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += parsedQuantity;
    } else {
      user.cart.push({ product: productId, quantity: parsedQuantity });
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
    console.log(userId, productId);
    if (!userId || !productId) {
      throw new BadRequestError("Missing or invalid parameters");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const index = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (index !== -1) {
      user.cart.splice(index, 1);
      await user.save();
      console.log({ "updated user": user });
      res.json(user);
    } else {
      throw new NotFoundError("Item not found in cart");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const file = req.file;

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { firstName, lastName, email, birthday, address } = req.body;

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (birthday !== undefined) user.birthday = birthday;
    if (address !== undefined) user.address = address;

    if (file) {
      const avatarPath = path.join("uploads", file.filename);
      user.avatar = avatarPath;
    }

    await user.save();

    res.json({
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile update error:", error.message, error.stack);
    next(error);
  }
};
module.exports.addOrder = async (req, res, next) => {
  try {
    const { userId, orderData } = req.body;

    if (!userId || !orderData) {
      throw new BadRequestError("Missing required parameters");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const orderedProductIds = orderData.products.map((p) =>
      p.productId.toString()
    );

    // 🔥 Handle stock before placing the order:
    for (const orderedProduct of orderData.products) {
      const product = await Product.findById(orderedProduct.productId);

      if (!product) {
        throw new NotFoundError(
          `Product ${orderedProduct.productId} not found`
        );
      }

      if (product.stock < orderedProduct.quantity) {
        throw new BadRequestError(
          `Insufficient stock for product ${product.name}`
        );
      }

      product.stock -= orderedProduct.quantity;
      await product.save();
    }

    // 📦 Create Order:
    const order = await Order.create({
      userId,
      ...orderData,
    });
    order.populate("products");
    // 📜 Add Order to User's Orders:
    user.orders.push(order._id);

    // 🛒 Clean Ordered Products from Cart:
    user.cart = user.cart.filter((item) => {
      if (!item.product) {
        console.log("Skipping item without product:", item);
        return true;
      }

      const shouldRemove = orderedProductIds.includes(item.product.toString());
      if (shouldRemove) {
        console.log("Removing from cart:", item.product.toString());
      }

      return !shouldRemove;
    });

    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Add order error:", error.message, error.stack);
    next(error);
  }
};
