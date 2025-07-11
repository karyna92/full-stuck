const { User} = require("../models");

module.exports.registrationUser = async (req, res, next) => {
  try {
    const { body, hashedPassword } = req;
    const createdUser = await User.create({ ...body, hashedPassword });
    return res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
