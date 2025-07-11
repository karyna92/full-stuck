const Router = require("express");
const productController = require("../controllers/productController");
const pagination = require("../middleware/pagination");

const productRouter = Router();

productRouter.route("/").get( pagination, productController.getAllProducts);

productRouter.route("/:id").get(productController.getProductById)
.post(productController.createProduct)
// .put(productController.updateProduct)
// .delete(productController.deleteProduct);

module.exports = productRouter;
