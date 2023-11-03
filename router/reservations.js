import express from "express";
import ReservationController from "../controller/reservations.js";

const router = express.Router();

class ReservationRouter {
  constructor() {
    this.controller = new ReservationController();
  }

  start() {
    router.get("/:id?", this.controller.get);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  }
}

export default ReservationRouter;
