import UserService from "../service/users.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;

      let users = await this.service.get(id);
      res.json(users);
    } catch (error) {
      console.log("Error al obtener usuarios: ", error);
    }
  };

  add = async (req, res) => {
    try {
      let user = req.body;

      const added = await this.service.add(user);
      res.status(201)
      res.json(added);
    } catch (error) {
      res.status(400)
      console.log("Error al crear usuario: ", error);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.body;

      const updated = await this.service.update(id, user);
      res.json(updated);
    } catch (error) {
      console.log("Error al actualizar usuario: ", error);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.service.delete(id);
      res.json(deleted);
    } catch (error) {
      console.log("Error al eliminar usuario: ", error);
    }
  };
}

export default UserController;
