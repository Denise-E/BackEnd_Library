import UserModel from "../model/DAOs/users.js";
import { validate } from "./validations/users_validations.js"
import Errors from "./service_errors.js";

class UserService {
  constructor() {
    this.model = new UserModel();
  }

  get = async (id) => {
    if (id) {
      try {
        let result = await this.model.get(id);
        if (result == null) {
          throw new Errors.NotFoundError("No se encontro ningun user con el ID")
        }
        return result
      } catch (e) {
        if (e.constructor.name === "BSONError") {
          throw new Errors.InvalidParameterError("el parametro es invalido")
        } else {
          throw e
        }
      }
    } else {
      try {
        return await this.model.get_all();
      } catch (e) {
        throw e
      }
    }
  };
  get_by_email = async (email) => {
    return await this.model.get_by_email(email);
  };

  add = async (user) => {
    const valid = validate(user)
    if (!valid.result) {
      throw new Errors.ValidationError("El user recibido no es valido")
    } 
    return await this.model.add(user);
  };

  update = async (id, user) => {
    try {
      await this.get(id)
    } catch (e){
      throw e
    } 
    const valid = validate(user)
    if (!valid.result) {
      throw new Errors.ValidationError("El user recibido no es valido")
    } 
    try {
      return await this.model.update(id, user);
    } catch (e) {
      throw e
    }
  };

  delete = async (id) => {
    try {
      await this.get(id)
    } catch (e){
      throw e
    }
    try {
      return await this.model.delete(id);
    } catch (e) {
      throw e
    }
  };
}

export default UserService;
