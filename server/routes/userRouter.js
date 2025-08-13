const { Router } = require("express");
const upload = require("../middleware/upload");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const cartController = require("../controllers/cartController")
const checkToken = require("../middleware/checkToken");
const adminOnly = require("../middleware/adminOnly");

const UserRouter = Router();

UserRouter.use(checkToken);

UserRouter.route("/update").put(
  upload.single("avatar"),
  userController.updateUserProfile
);
////cart
UserRouter.route("/cart")
.get(cartController.getCartByUser)
  .post(cartController.addOrUpdateProduct);
  
UserRouter.delete("/cart/product/:productId", cartController.removeProduct);

///orders
UserRouter.route("/orders").get(orderController.getOrdersByUser);
UserRouter.route("/order").post(orderController.addOrder);
UserRouter.route("/orders/:orderId").put(
  adminOnly,
  orderController.updateOrder
);

module.exports = UserRouter;
