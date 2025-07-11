const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: Date,
    validate: {
      validator: (value) => value < new Date(),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) =>
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value),
    },
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["client", "admin"],
    default: "client",
  },
  wishList: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
