const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);

const EXPIRES_TIME_ACCESS_TOKEN = "1h";
const EXPIRES_TIME_REFRESH_TOKEN = "10h";


module.exports.createAccessToken = async ({ userId, email , role}) =>
  await promisifyJWTSign({ userId, email, role }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: EXPIRES_TIME_ACCESS_TOKEN,
  });

module.exports.verifyAccessToken = async (token) =>
  await promisifyJWTVerify(token, process.env.JWT_SECRET_ACCESS);

module.exports.createRefreshToken = async ({ userId, email, role }) =>
  await promisifyJWTSign({ userId, email, role }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: EXPIRES_TIME_REFRESH_TOKEN,
  });

module.exports.verifyRefreshToken = async (token) =>
  await promisifyJWTVerify(token, process.env.JWT_SECRET_REFRESH);
