const { verifyAccessToken } = require("../services/createSessionToken");
const UnauthorizedError = require("../errors/UnauthorizedError");

const checkToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Invalid authorization header format");
    }

    const payload = await verifyAccessToken(token);

    req.tokenPayload = payload;

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error);
    }
    return next(new UnauthorizedError("Unauthorized"));
  }
};

module.exports = checkToken; 