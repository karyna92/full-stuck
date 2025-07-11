const Router = require("express");
const authRouter = require("./authRouter");
// const userRouter = require("./userRouter");

const router = Router();

router.use("/authentication", authRouter);


module.exports = router;
