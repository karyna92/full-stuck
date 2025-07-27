const {Router} = require("express");
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const { sendMessageToTelegram } = require("../telegramBot");
const {getBotReply} = require("../helpers/getBotToReplay");

const router = Router();

router.use("/authentication", authRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const reply = getBotReply(message);
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to process message" });
  }
});

module.exports = router;
