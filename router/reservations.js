import express from "express";
import ReservationsController from "../controller/reservations.js";

const router = express.Router();

class ReservationsRouter {
  constructor() {
    this.controller = new ReservationsController();
  }

  start() {
    router.get("/:id?", this.controller.get);
    router.post("/", this.controller.add);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  }
}

export default ReservationsRouter;
