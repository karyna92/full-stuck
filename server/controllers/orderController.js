const { User, Order, Product } = require("../models");
const { NotFoundError, BadRequestError } = require("../errors");

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


module.exports.updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, items, totalPrice } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (status) {
      order.status = status;
    }

    if (items) {
      order.items = items;
    }

    if (totalPrice) {
      order.totalPrice = totalPrice;
    }

    const updatedOrder = await order.save();

    res.status(200).send({ message: "Order updated", order: updatedOrder });
  } catch (error) {
    next(error);
  }
};
