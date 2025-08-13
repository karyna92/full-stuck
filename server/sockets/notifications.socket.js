const { isDateInRange } = require("../helpers/isDateInRange");

module.exports = (io, socket) => {
  if (isDateInRange({ day: 15, month: 8 }, { day: 30, month: 8 })) {
    socket.emit("toast", {
      type: "info",
      message: "🔥 Summer Sale! Don't miss our hot deals until 30 August!",
    });
  }
};
