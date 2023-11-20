import UserModel from "../model/DAOs/users.js";

class UserService {
  constructor() {
    this.model = new UserModel();
  }

  get = async (id) => {
    return await this.model.get(id);
  };
  get_by_email = async (email) => {
    return await this.model.get_by_email(email);
  };

  add = async (user) => {
    return await this.model.add(user);
  };

  update = async (id, user) => {
    return await this.model.update(id, user);
  };

  delete = async (id) => {
    return await this.model.delete(id);
  };
}

export default UserService;
