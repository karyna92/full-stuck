const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);

const EXPIRES_TIME_ACCESS_TOKEN = "1h";
const EXPIRES_TIME_REFRESH_TOKEN = "5h";


module.exports.createAccessToken = async ({ userId, email }) =>
  await promisifyJWTSign({ userId, email }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: EXPIRES_TIME_ACCESS_TOKEN,
  });

module.exports.verifyAccessToken = async (token) =>
  await promisifyJWTVerify(token, process.env.JWT_SECRET_ACCESS);

module.exports.createRefreshToken = async ({ userId, email }) =>
  await promisifyJWTSign({ userId, email }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: EXPIRES_TIME_REFRESH_TOKEN,
  });

module.exports.verifyRefreshToken = async (token) =>
  await promisifyJWTVerify(token, process.env.JWT_SECRET_REFRESH);
