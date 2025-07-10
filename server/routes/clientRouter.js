const Router = require("express");
const clientController = require("./controllers/clientController");

const ClientRouter = Router();
ClientRouter.route("/")
  .get(clientController.getAll)
  .post(clientController.create);

  ClientRouter.route("/:id")
  .get(clientController.getOne)
  .put(clientController.update)
  .delete(clientController.delete);


module.exports = ClientRouter; 
