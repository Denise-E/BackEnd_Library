import fs from "fs";

class UserModel {
  constructor() {
    this.name = "data/users.json";
  }

  leerArchivo = async (name) => {
    let users = undefined;

    try {
      users = JSON.parse(await fs.promises.readFile(name, "utf8"));
    } catch (error) {
      throw new Error(`Error leyendo ${this.name}`);
    }

    return users;
  };

  escribirArchivo = async (name, user) => {
    try {
      await fs.promises.writeFile(
        name,
        JSON.stringify(user, null, "\t")
      );
    } catch (error) {
      throw new Error(`Error escribiendo en ${this.name}`);
    }
  };

  getNext_Id(users) {
    let lg = users.length;
    return lg ? parseInt(users[lg - 1].id) + 1 : 1;
  }

  get = async (id) => {
    try {
      const users = await this.leerArchivo(this.name);

      if (id != undefined) {
        const p = users.find((p) => p.id == id);
        return p || {};
      } else {
        return users;
      }
    } catch {
      return id ? {} : [];
    }
  };

  add = async (user) => {
    try {
      const users = await this.leerArchivo(this.name);

      user.id = this.getNext_Id(users);

      user.name = user.name;
      user.email = user.email;
      user.isAdmin = user.isAdmin;
      user.password = user.password;

      users.push(user);
      await this.escribirArchivo(this.name, users);

      return user;
    } catch (err) {
      throw err.message;
    }
  };

  update = async (id, user) => {
    try {
      user.id = parseInt(id);
      const users = await this.leerArchivo(this.name);

      const index = users.findIndex((p) => p.id == id);

      if (index != -1) {
        const old_user = users[index];

        const new_user = { ...old_user, ...user };

        users.splice(index, 1, new_user);
        await this.escribirArchivo(this.name, users);

        return new_user;
      } else {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }
    } catch (err) {
      throw err.message;
    }
  };

  delete = async (id) => {
    try {
      const users = await this.leerArchivo(this.name);
      let user = {};

      const index = users.findIndex((p) => p.id == id);

      if (index == -1) {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }

      user = users.splice(index, 1)[0];
      await this.escribirArchivo(this.name, users);
      return user;
    } catch (err) {
      throw err.message;
    }
  };
}

export default UserModel;
