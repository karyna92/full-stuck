const Router = require("express");
const userController = require("../controllers/userController");


const UserRouter = Router();

UserRouter.route("/:userId/cart").put(userController.updateCart);



module.exports = UserRouter; 
