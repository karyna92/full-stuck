const { Router } = require("express");
const upload = require("../middleware/upload");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const checkToken = require("../middleware/checkToken");
const adminOnly = require("../middleware/adminOnly");

const UserRouter = Router();

UserRouter.use(checkToken);

UserRouter.route("/:userId/update").put(
  upload.single("avatar"),
  userController.updateUserProfile
);

UserRouter.route("/:userId/cart")
  .post(userController.updateCart)
  .delete(userController.deleteItemFromCart);

UserRouter.route("/:userId/order").post(orderController.addOrder);

UserRouter.route("/:userId/orders/:orderId").put(
  checkToken,
  adminOnly,
  orderController.updateOrder
);

module.exports = UserRouter;
