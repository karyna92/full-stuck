const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes");
const { errorHandler } = require("./errorHandler");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/", router);

app.use(
  "/images/products",
  express.static(path.join(__dirname, "public/images/products"))
);

app.use(
  "/images/users",
  express.static(path.join(__dirname, "public/images/users"))
);
app.use(errorHandler);

module.exports = app;