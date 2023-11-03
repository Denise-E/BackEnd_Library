import express from "express";
import BookController from "../controller/books.js";

const router = express.Router();

class RouterBook {
  constructor() {
    this.controller = new BookController();
  }

  start() {
    router.get("/:id?", this.controller.get);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  }
}

export default RouterBook;
