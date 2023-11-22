import UserService from "../service/users.js";
import Errors from "../service/service_errors.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  get = async (req, res) => {
    try {

      const { id } = req.params;
      let users = await this.service.get(id);
      res.status(200).json(users);


    } catch (error) {
      if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else if (error instanceof Errors.InvalidParameterError) {
        res.status(400).json({ error: "el parametro es invalido" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  add = async (req, res) => {
    try {

      let user = req.body;
      const added = await this.service.add(user);
      res.status(201).json({ data: added });

    } catch (error) {
      if (error instanceof Errors.ValidationError) {
        res.status(400).json({ error: "el usuario no es valida para crear" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.body;

      const updated = await this.service.update(id, user);
       res.status(200).json(updated);
    } catch (error) {
      if (error instanceof Errors.ValidationError) {
        res.status(400).json({ error: "el usuario enviado no es valida para actualizar" })
      } else if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.service.delete(id);
      res.status(200).json(deleted);
    } catch (error) {
      if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };
}

export default UserController;
