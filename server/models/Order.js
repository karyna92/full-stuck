const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, ref: "User"
 },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],

  total: {
     type: Number, default: 0 
    },
  status: { 
    type: String, default: "pending" 
},
  paymentMethod: {
     type: String, default: "cash"
     },
  paymentStatus: {
     type: String, default: "pending"
     },
  deliveryAddress: {
     type: String, default: "" 
    },
  deliveryStatus: {
     type: String, default: "pending"
     },
  createdAt: { 
     type: Date, default: Date.now
     },
  updatedAt: { 
    type: Date, default: Date.now
 },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
