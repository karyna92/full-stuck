const {
  createAccessToken,
  createRefreshToken,
} = require("../services/createSessionToken");
const { RefreshToken } = require("../models");

module.exports.generateTokens = async (user) => {
  const accessToken = await createAccessToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = await createRefreshToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  await RefreshToken.create({ token: refreshToken, userId: user._id });

  return { accessToken, refreshToken };
};
