import express from "express";
import UserController from "../controller/users.js";

const router = express.Router();

class UserRouter {
  constructor() {
    this.controller = new UserController();
  }

  start() {
    router.get("/:id?", this.controller.get);

    router.post("/", this.controller.add);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  }
}

export default UserRouter;
