import UserModel from "../model/DAOs/users.js";
import { validate } from "./validations/users_validations.js"
import Errors from "./service_errors.js";

class UserService {
  constructor() {
    this.model = new UserModel();
  }

  get = async (id) => {
    try {
    if (id) {
        let result = await this.model.get_by_id(id);
        if (result == null) {
          throw new Errors.NotFoundError("No se encontro ningun user con el ID")
        }
        return result
    } else {
        return await this.model.get_all();
      }
    } catch (e) {
      if (e.constructor.name === "BSONError") {
        throw new Errors.InvalidParameterError("el parametro es invalido")
      } else {
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
      throw new Errors.ValidationError("el user recibido no es valido")
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
