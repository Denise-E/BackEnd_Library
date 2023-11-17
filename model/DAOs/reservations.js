import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongoDB {
  get = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [];

    if (id) {
      const producto = await CnxMongoDB.db
        .collection("reservations")
        .findOne({ _id: new ObjectId(id) });
      return producto;
    } else {
      const productos = await CnxMongoDB.db
        .collection("reservations")
        .find({})
        .toArray();
      return productos;
    }
  };

  add = async (producto) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db.collection("reservations").insertOne(producto);
    return producto;
  };

  update = async (id, producto) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db
      .collection("reservations")
      .updateOne({ _id: new ObjectId(id) }, { $set: producto });

    const productosActualizado = await this.obtenerProductos(id);
    return productosActualizado;
  };

  delete = async (id) => {
    if (!CnxMongoDB.connection) return {};

    const productosBorrado = await this.obtenerProductos(id);
    await CnxMongoDB.db
      .collection("reservations")
      .deleteOne({ _id: new ObjectId(id) });
    return productosBorrado;
  };
}

export default ModelMongoDB;
