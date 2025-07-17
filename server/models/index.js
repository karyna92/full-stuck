const mongoose = require("mongoose");
const { DB } = require("../configs/DB.config");
const User = require("./User");
const Order = require("./Order");
const Product = require("./Product");
const Review = require("./Review");
const RefreshToken = require("./RefreshToken")

async function start() {
  await mongoose.connect(DB).catch((err) => {
    console.log(`Connect failed: ${err.message}`);
  });
}
start();

module.exports = {
  User,
  Order,
  Product,
  Review,
  RefreshToken,
};