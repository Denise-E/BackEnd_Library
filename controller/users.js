import UserService from "../service/users.js";

class UserController {
  constructor() {
    this.service = new UserService();
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;

      let productos = await this.service.get(id);
      res.json(productos);
    } catch (error) {
      console.log("Error al obtener usuarios: ", error);
    }
  };

  add = async (req, res) => {
    try {
      let prod = req.body;

      const added = await this.service.add(prod);
      res.json(added);
      //.redirect('/');
    } catch (error) {
      console.log("Error al crear usuario: ", error);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const prod = req.body;

      const producto = await this.service.update(id, prod);
      res.json(producto);
    } catch (error) {
      console.log("Error al actualizar usuario: ", error);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const prod = await this.service.delete(id);
      res.json(prod);
    } catch (error) {
      console.log("Error al eliminar usuario: ", error);
    }
  };
}

export default UserController;
