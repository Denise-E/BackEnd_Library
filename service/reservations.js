import ReservationsModel from "../model/DAOs/reservations.js";

class ReservationsService {
  constructor() {
    this.model = new ReservationsModel();
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

export default ReservationsService;
