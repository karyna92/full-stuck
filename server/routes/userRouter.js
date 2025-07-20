const Router = require("express");
const upload = require("../middleware/upload");
const userController = require("../controllers/userController");


const UserRouter = Router();

UserRouter.route("/:userId/cart")
  .post(userController.updateCart)
  .delete(userController.deleteItemFromCart);

  UserRouter.route("/:userId/order").post(userController.addOrder);

  UserRouter.route("/:userId/update").put(
    upload.single("avatar"), 
    userController.updateUserProfile
  );
// UserRouter.route("/:userId/avatar").post(
//   upload.single("avatar"),
//   userController.uploadAvatar
// );

module.exports = UserRouter; 
