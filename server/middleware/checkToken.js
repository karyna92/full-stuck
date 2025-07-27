const { verifyAccessToken } = require("../services/createSessionToken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const admin = require("../configs/firebaseAdmin");

const checkToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Invalid authorization header format");
    }

    let payload;
   
    try {
      payload = await verifyAccessToken(token);
    } catch (err) {
    
      try {
        const decodedFirebaseToken = await admin.auth().verifyIdToken(token);
        payload = {
          uid: decodedFirebaseToken.uid,
          email: decodedFirebaseToken.email,
          role: decodedFirebaseToken.role || "user", 
          provider: "firebase",
        };
      } catch (firebaseError) {
        throw new UnauthorizedError("Token verification failed");
      }
    }

    req.tokenPayload = payload;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = checkToken;
