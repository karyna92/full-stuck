const Router = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/sing-in", authController.loginUser);
router.post("/sing-up", authController.registrationUser);

module.exports = router;
