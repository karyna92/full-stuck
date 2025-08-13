const http = require("http");
const setupSocket = require("./configs/socketConfig");
const app = require("./app");
const config = require("./configs/appConfig");


const server = http.createServer(app);
setupSocket(server);


server.listen(config.app.port, () => {
  console.log(`App started on port ${config.app.port}`);
});