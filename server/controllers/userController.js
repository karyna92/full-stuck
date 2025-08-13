const { User} = require("../models");
const path = require("path");
const { NotFoundError, BadRequestError } = require("../errors");


module.exports.updateUserProfile = async (req, res, next) => {
  try {
   const userId = req.user.id; 
    const file = req.file;

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { firstName, lastName, email, birthday, address } = req.body;

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (birthday !== undefined) user.birthday = birthday;
    if (address !== undefined) user.address = address;

    if (file) {
      const avatarPath = path.join("uploads", file.filename);
      user.avatar = avatarPath;
    }

    await user.save();

    res.json({
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile update error:", error.message, error.stack);
    next(error);
  }
};
