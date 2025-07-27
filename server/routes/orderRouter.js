

const { Router } = require("express");
const orderController = require("../controllers/orderController");
const pagination = require("../middleware/pagination");
const checkToken=require("../middleware/checkToken");
const adminOnly=require("../middleware/adminOnly")


const orderRouter = Router();

orderRouter.route("/").get(pagination, checkToken, adminOnly, orderController.getAllOrders);

module.exports = orderRouter;