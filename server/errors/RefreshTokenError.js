const CustomError = require("./CustomError");

class RefreshTokenError extends CustomError {
  constructor(message = "Invalid refresh token") {
    super(message, 403);
  }
}

module.exports = RefreshTokenError;
