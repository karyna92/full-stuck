const TelegramBot = require("node-telegram-bot-api");

const token ="8336671017:AAHYzDXT6KeD6-Z-b9r3ChOX4DPGi42BcOY";
const bot = new TelegramBot(token, { polling: true });

let lastChatId = null;

bot.on("message", (msg) => {
  lastChatId = msg.chat.id;
  console.log("Message from user:", msg.text);
});

const sendMessageToTelegram = async (message) => {
  if (!lastChatId) {
    throw new Error("No active Telegram chat session.");
  }
  await bot.sendMessage(lastChatId, message);
};

module.exports = { sendMessageToTelegram };

// const TelegramBot = require("node-telegram-bot-api");

// const token = "8336671017:AAHYzDXT6KeD6-Z-b9r3ChOX4DPGi42BcOY";
// const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(
//     msg.chat.id,
//     "👋 Hello! I'm your support assistant. Type /help to see what I can do."
//   );
// });

// bot.onText(/\/help/, (msg) => {
//   bot.sendMessage(
//     msg.chat.id,
//     `
// Available commands:
// /faq - Frequently Asked Questions
// /orderstatus - Check order status
// /returnpolicy - Return and refund policy
// /contact - Talk to human support
//   `
//   );
// });

// bot.onText(/\/faq/, (msg) => {
//   bot.sendMessage(
//     msg.chat.id,
//     "Here are some frequently asked questions:\n1. How long is delivery?\n2. What payment methods do you accept?\n3. Can I return items?"
//   );
// });

// bot.onText(/\/orderstatus/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Please provide your order number.");
// });
