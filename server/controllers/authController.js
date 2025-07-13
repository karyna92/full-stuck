const bcrypt = require("bcrypt");
const { User } = require("../models");


module.exports.registrationUser = async (req, res, next) => {
  console.log(req.body)
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const newUser = await User.create(req.body);
    console.log("User successfully created:", newUser);
    res.status(201).send({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ message: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Incorrect password" });
    }
    console.log({ message: "Login successful", user: user });
    res.status(200).send({ message: "Login successful", user: user });
  } catch (error) {
   next(error)
  }
};
