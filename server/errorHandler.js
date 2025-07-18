const {
  Error: { ValidationError, CastError },
} = require("mongoose");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { CustomError } = require("./errors");


module.exports.errorHandler = async (err, req, res, next) => {
  console.log(err)
  
  if (err instanceof ValidationError) {
    return res.status(400).send({ error: err.message });
  }

  if (err instanceof CastError) {
    return res.status(400).send({ error: "Invalid id" });
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    return res.status(403).send({ error: "Invalid Token" });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err.message });
  }

  return res.status(500).send({ error: err.message });
};
