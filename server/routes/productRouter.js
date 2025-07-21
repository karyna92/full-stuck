console.log("productRouter file is loaded");

const { Router } = require("express");
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const pagination = require("../middleware/pagination");
const checkToken = require("../middleware/checkToken");
const adminOnly = require("../middleware/adminOnly");
const uploadProducts = require("../middleware/uploadImgVideo");

const productRouter = Router();

console.log(typeof checkToken); 
console.log(typeof adminOnly);
console.log(typeof productController.createProduct);


productRouter
  .route("/")
  .get(pagination, productController.getAllProducts)
  .post(
    checkToken,
    adminOnly,
    uploadProducts.array("media", 10),
    productController.createProduct
  );

productRouter
  .route("/:id")
  .get(productController.getProductById)
  .put(
    checkToken,
    adminOnly,
    uploadProducts.array("media", 10),
    productController.updateProduct
  )
  .delete(checkToken, adminOnly, productController.deleteProduct);

// Authenticated users only: Post a review
productRouter
  .route("/:id/reviews")
  .post(checkToken, reviewController.createReview);

module.exports = productRouter;
