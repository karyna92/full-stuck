const Router = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/sing-in", authController.loginUser);
authRouter.post("/sing-up", authController.registrationUser);

module.exports = authRouter;
