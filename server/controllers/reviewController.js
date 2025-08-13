const { Review, Product } = require("../models");

module.exports.createReview = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const {reviewData } = req.body;
    const productId = req.params.id;

    if (!reviewData?.rating || !reviewData?.comment) {
      return res
        .status(400)
        .json({ message: "Rating and comment are required." });
    }

    // 1. Create and save review
    const review = new Review({
      user: userId,
      product: productId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });

    await review.save();

    // 2. Attach review to product atomically
    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: review._id } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 3. Respond with populated review if needed
    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "username email"
    );

    res.status(201).json({
      message: "Review created and added to product successfully",
      review: populatedReview,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId })
      .populate("user", "username email") 
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    res.status(500).json({
      success: false,
      message: "Server error fetching product reviews",
    });
  }
};

module.exports.deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id; 

    // 1. Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // 2. Check if user owns the review
    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this review" });
    }

    const productId = review.product;

    // 3. Delete the review
    await Review.findByIdAndDelete(reviewId);

    // 4. Remove review reference from product
    await Product.findByIdAndUpdate(productId, {
      $pull: { reviews: reviewId },
    });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
