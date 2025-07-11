const Router = require("express");
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
// const userRouter = require("./userRouter");

const router = Router();

router.use("/authentication", authRouter);
router.use("/products", productRouter);


module.exports = router;
