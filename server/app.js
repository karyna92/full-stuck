const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes");
const { errorHandler } = require("./errorHandler");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/", router);

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  "/api/uploadsProducts",
  express.static(path.join(__dirname, "uploadsProducts"))
);

app.use(errorHandler);

module.exports = app;