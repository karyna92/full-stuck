const Router = require("express");
const authController = require("../controllers/authController");
const { hashPass } = require("../middleware/hashPassword"); 

const authRouter = Router();

authRouter.post("/sign-up", hashPass, authController.registrationUser);

authRouter.post("/sign-in", authController.loginUser);

module.exports = authRouter;
