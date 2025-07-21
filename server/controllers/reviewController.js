const { Review, Product } = require("../models");

module.exports.createReview = async (req, res, next) => {
  try {
    const { userId, reviewData } = req.body;
    const productId = req.params.id;

    // 1. Create and save review
    const review = new Review({
      user: userId,
      product: productId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });

    await review.save();

    // 2. Attach review to product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews.push(review._id);
    await product.save();

    // 3. Response
    res.status(201).json({
      message: "Review created and added to product successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};
