const { verifyAccessToken } = require("../services/createSessionToken");

module.exports.checkToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

     if (!authorization) {
       return res.status(401).send({ message: "No token provided" });
     }
    const [, token] = authorization.split(" ");

    const payload = await verifyAccessToken(token);

    req.tokenPayload = payload;

    next();
  } catch (error) {
    next(error);
  }
};
