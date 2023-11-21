import UserModel from "../model/DAOs/users.js";
import { validate } from "./validations/users_validations.js"

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
    const valid = validate(user)
    if (valid) {
      return await this.model.add(user);
    } else {
      console.log(valid.error)
    }
  };

  update = async (id, user) => {
    const valid = validate(user)
    if (valid) {
      return await this.model.update(id, user);
    } else {
      console.log(valid.error)
    }
  };

  delete = async (id) => {
    return await this.model.delete(id);
  };
}

export default UserService;
