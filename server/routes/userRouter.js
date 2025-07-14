const Router = require("express");
const userController = require("../controllers/userController");


const UserRouter = Router();

UserRouter.route("/:userId/cart")
  .post(userController.updateCart)
  .delete(userController.deleteItemFromCart);



module.exports = UserRouter; 
