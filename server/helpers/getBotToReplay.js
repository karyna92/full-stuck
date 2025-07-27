module.exports.getBotReply = (message) => {
  const lower = message.toLowerCase();

  if (lower.includes("/help")) {
    return `Ось що я вмію:\n/help - Команди\n/tariffs - Тарифи\n/order - Як замовити\n/contact - Контакт`;
  }
  if (lower.includes("/tariffs")) {
    return `Наші тарифи: Базовий, Стандарт, Преміум. Детальніше на сторінці "Тарифи".`;
  }
  if (lower.includes("/order")) {
    return `Щоб оформити замовлення, додайте товар до кошика та натисніть "Оформити".`;
  }
  if (lower.includes("/contact")) {
    return `Напишіть нам на support@electroshop.com або в Telegram @electroshop_support.`;
  }

  return `🤖 Я ще не розумію цього запиту. Напишіть /help для списку команд.`;
};
