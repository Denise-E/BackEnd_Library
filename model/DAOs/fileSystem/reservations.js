import fs from "fs";

class ReservationModel {
  constructor() {
    this.name = "data/reservations.json";
  }

  leerArchivo = async (name) => {
    let reservations = undefined;

    try {
      reservations = JSON.parse(await fs.promises.readFile(name, "utf8"));
    } catch (error) {
      throw new Error(`Error leyendo ${this.name}`);
    }

    return reservations;
  };

  escribirArchivo = async (name, reservations) => {
    try {
      await fs.promises.writeFile(
        name,
        JSON.stringify(reservations, null, "\t")
      );
    } catch (error) {
      throw new Error(`Error escribiendo en ${this.name}`);
    }
  };

  getNext_Id(reservations) {
    let lg = reservations.length;
    return lg ? parseInt(reservations[lg - 1].id) + 1 : 1;
  }

  get = async (id) => {
    try {
      const reservations = await this.leerArchivo(this.name);

      if (id != undefined) {
        const p = reservations.find((p) => p.id == id);
        return p || {};
      } else {
        return reservations;
      }
    } catch {
      return id ? {} : [];
    }
  };

  get_by_user = async (id) => {
    try {
      const reservations = await this.leerArchivo(this.name);

      if (id != undefined) {
        const p = reservations.find((p) => p.id_client == id);
        return p || {};
      } else {
        return reservations;
      }
    } catch {
      return id ? {} : [];
    }
  };

  add = async (reservation) => {
    try {
      const reservations = await this.leerArchivo(this.name);

      reservation.id = this.getNext_Id(reservations);

      reservation.id_client = reservation.id_client;
      reservation.id_book = reservation.id_book;

      reservations.push(reservation);
      await this.escribirArchivo(this.name, reservations);

      return reservation;
    } catch (err) {
      throw err.message;
    }
  };

  update = async (id, reservation) => {
    try {
      reservation.id = parseInt(id);
      const reservations = await this.leerArchivo(this.name);

      const index = reservations.findIndex((p) => p.id == id);

      if (index != -1) {
        const old_res = reservations[index];

        const new_res = { ...old_res, ...reservation };

        reservations.splice(index, 1, new_res);
        await this.escribirArchivo(this.name, reservations);

        return new_res;
      } else {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }
    } catch (err) {
      throw err.message;
    }
  };

  delete = async (id) => {
    try {
      const reservations = await this.leerArchivo(this.name);
      let reservation = {};

      const index = reservations.findIndex((p) => p.id == id);

      if (index == -1) {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }

      reservation = reservations.splice(index, 1)[0];

      await this.escribirArchivo(this.name, reservations);
      return reservation;
    } catch (err) {
      throw err.message;
    }
  };
}

export default ReservationModel;
