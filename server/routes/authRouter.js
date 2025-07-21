const {Router} = require("express");
const authController = require("../controllers/authController");
const { hashPass } = require("../middleware/hashPassword"); 
const  checkToken  = require("../middleware/checkToken");

const authRouter = Router();

authRouter.post("/sign-up", hashPass, authController.registrationUser);

authRouter.post("/sign-in", authController.loginUser);

authRouter.get("/", checkToken, authController.checkAuth);

authRouter.post("/refresh", authController.refreshSession);

module.exports = authRouter;
