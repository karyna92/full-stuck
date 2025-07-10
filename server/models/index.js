const mongoose = require("mongoose");
const { DB } = require("../configs/DB.config");
const Client = require("./Client");

async function start() {
  await mongoose.connect(DB).catch((err) => {
    console.log(`Connect failed: ${err.message}`);
  });
}
start();

module.exports = {
  Client,
};