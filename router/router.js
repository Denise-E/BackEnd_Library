import express from "express";
import Controller from "../controller/controller.js";

const router = express.Router();

class Router {
  constructor() {
    this.controller = new Controller();
  }

  start() {
    router.get("/:id?", this.controller.get);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  }
}

export default Router;
