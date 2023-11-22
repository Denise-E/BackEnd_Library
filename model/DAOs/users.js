import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongoDB {
  get = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [];

    if (id) {
      const user = await CnxMongoDB.db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      return user;
    } else {
      const users = await CnxMongoDB.db
        .collection("users")
        .find({})
        .toArray();
        // console.log(users);
      return users;
    }
  };
  get_by_email = async (email) => {
    if (!CnxMongoDB.connection) return email ? {} : [];
  
    if (email) {
      const user = await CnxMongoDB.db
        .collection("users")
        .findOne({ email: email });
      return user;
    } else {
      return [];
    }
  };
  

  add = async (user) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db.collection("users").insertOne(user);
    return user;
  };

  update = async (id, user) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: user });

    const updated = await this.get(id);
    return updated;
  };

  delete = async (id) => {
    if (!CnxMongoDB.connection) return {};

    const deleted = await this.get(id);
    await CnxMongoDB.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });
    return deleted;
  };
}

export default ModelMongoDB;
