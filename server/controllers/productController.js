const { Product } = require("../models");
const { NotFoundError } = require("../errors");

module.exports.createProduct = async (req, res, next) => {
  try {
    const mediaPaths =
      req.files?.map((file) => `/uploadsProducts/${file.filename}`) || [];

    const newProduct = await Product.create({
      ...req.body,
      media: mediaPaths,
    });

    res.status(201).send({
      message: "Product created",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const { limit, skip, page } = req.pagination;

    const products = await Product.find().limit(limit).skip(skip);
    const total = await Product.countDocuments();

   
    res.json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
      console.log("Get product by ID called:", req.params.id);

    const product = await Product.findById(id).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "firstName lastName avatar",
      },
    });

    if (product?.reviews?.length) {
      product.reviews = product.reviews.map((review) => {
        const user = review.user ? {
          _id: review.user._id,
          name: `${review.user.firstName} ${review.user.lastName}`,
          avatar: review.user.avatar,
        } : null;

        return {
          _id: review._id,
          rating: review.rating,
          comment: review.comment,
          user,
        };
      });
    }

    const productData = {
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      discount: product.discount,
      media: product.media,
      reviews: product.reviews,
    };

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mediaPaths =
      req.files?.map((file) => `/uploadsProducts/${file.filename}`) || [];

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        $push: { media: { $each: mediaPaths } }, 
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};