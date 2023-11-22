import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongoDB {
  get_all = async () => {
    if (!CnxMongoDB.connection) return id ? {} : [];
    const reservations = await CnxMongoDB.db
    .collection("reservations")
    .find({})
    .toArray();

  return reservations;
  }
  get_by_id = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [];

    try {
      if (id) {
        const reservation = await CnxMongoDB.db
          .collection("reservations")
          .findOne({ _id: new ObjectId(id) })
        
        return reservation;
      }
    } catch (e) {
      throw e
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

    const deleted = await this.get_by_id(id);
    await CnxMongoDB.db
      .collection("reservations")
      .deleteOne({ _id: new ObjectId(id) });
    return deleted;
  };
}

export default ModelMongoDB;
