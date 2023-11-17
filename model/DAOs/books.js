import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongoDB {
  get = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [];

    if (id) {
      const book = await CnxMongoDB.db
        .collection("books")
        .findOne({ _id: new ObjectId(id) });
      return book;
    } else {
      const books = await CnxMongoDB.db
        .collection("books")
        .find({})
        .toArray();
      return books;
    }
  };

  add = async (book) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db.collection("books").insertOne(book);
    return book;
  };

  update = async (id, books) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db
      .collection("books")
      .updateOne({ _id: new ObjectId(id) }, { $set: books });

    const updated = await this.get(id);
    return updated;
  };

  delete = async (id) => {
    if (!CnxMongoDB.connection) return {};

    const deleted = await this.get(id);
    await CnxMongoDB.db
      .collection("books")
      .deleteOne({ _id: new ObjectId(id) });
    return deleted;
  };
}

export default ModelMongoDB;
