import ReservationModel from "../model/DAOs/reservations.js";

class ReservationService {
  constructor() {
    this.model = new ReservationModel();
  }

  get = async (id) => {
    return await this.model.get(id);
  };

  add = async (prod) => {
    return await this.model.add(prod);
  };

  update = async (id, prod) => {
    return await this.model.update(id, prod);
  };

  delete = async (id) => {
    return await this.model.delete(id);
  };

}

export default ReservationService;
