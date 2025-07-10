const Router = require("express");
const clientRouter = require("./client");

const router = Router();

router.use("/clients", clientRouter);

module.exports = router;
