import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongoDB {
  get = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [];

    if (id) {
      const reservation = await CnxMongoDB.db
        .collection("reservations")
        .findOne({ _id: new ObjectId(id) });
      return reservation;
    } else {
      const reservations = await CnxMongoDB.db
        .collection("reservations")
        .find({})
        .toArray();
      return reservations;
    }
  };


  add = async (prod) => {
    try {

      /* Valido la cantidad de campos ingresados
      if(Object.keys(number).length > 1){ 
        return `Debe ingresar unicamente el campo numero`;
      }

      Valido los campos ingresados, las keys
      if (
        prod["titulo"] == undefined ||
        prod["autor"] == undefined ||
        prod["anio"] == undefined
      ) {
        return `Debe ingresar todos los datos`;
      } */

      const productos = await this.leerArchivo(this.nombre);

      prod.id = this.getNext_Id(productos);

      prod.id_client = prod.id_client;
      prod.id_book = prod.id_book;
      prod.initial_date = Date.parse(prod.initial_date);
      prod.final_date = null; 

      productos.push(prod);
      await this.escribirArchivo(this.nombre, productos);

      return prod;
    } catch (err) {
      throw err.message;
    }
  };

  update = async (id, prod) => {
    try {
      prod.id = parseInt(id);
      const productos = await this.leerArchivo(this.nombre);

      const index = productos.findIndex((p) => p.id == id);

      if (index != -1) {
        const prodAnt = productos[index];

        const prodNuevo = { ...prodAnt, ...prod };

        productos.splice(index, 1, prodNuevo);
        await this.escribirArchivo(this.nombre, productos);

        return prodNuevo;
      } else {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }
    } catch (err) {
      throw err.message;
    }
  };

  delete = async (id) => {
    if (!CnxMongoDB.connection) return {};

    const deleted = await this.get(id);
    await CnxMongoDB.db
      .collection("reservations")
      .deleteOne({ _id: new ObjectId(id) });
    return deleted;
  };
}

export default ModelMongoDB;
