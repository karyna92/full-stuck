

const adminOnly = (req, res, next) => {
  if (req.tokenPayload?.role !== "admin") {
    return res.status(403).send({ message: "Access denied: Admins only" });
  }
  next();
};

module.exports =  adminOnly ; 