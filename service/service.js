import Model from "../model/DAOs/model.js";

class Service {
  constructor() {
    this.model = new Model();
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

export default Service;
