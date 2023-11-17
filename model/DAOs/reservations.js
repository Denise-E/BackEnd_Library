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

  add = async (reservation) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db.collection("reservations").insertOne(reservation);
    return reservation;
  };

  update = async (id, reservation) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db
      .collection("reservations")
      .updateOne({ _id: new ObjectId(id) }, { $set: reservation });

    const updated = await this.get(id);
    return updated;
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
