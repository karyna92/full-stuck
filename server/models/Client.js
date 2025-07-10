const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
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
    validate: {
      validator: (value) =>
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value),
    },
  },
  password: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
