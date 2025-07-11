const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.hashPass = async (req, res, next) => {
  try {
    const { password } = req.body;

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    req.body.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
};
