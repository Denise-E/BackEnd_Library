import express from "express";
import BookController from "../controller/books.js";

const router = express.Router();

class BookRouter {
  constructor() {
    this.controller = new BookController();
  }

  start() {
    router.get("/suggested", this.controller.get_suggestions);
    router.get("/:id?", this.controller.get);
    
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  }
}

export default BookRouter;
