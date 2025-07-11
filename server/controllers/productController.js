const { Product } = require("../models");

module.exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product(req.body);
    res.status(201).json({ message: "Product created successfully" });
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
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    next(error);
  }
};
