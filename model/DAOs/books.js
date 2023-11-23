import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongoDB {
  get_all = async () => {
    if (!CnxMongoDB.connection) return id ? {} : [];
    const books = await CnxMongoDB.db
      .collection("books")
      .find({})
      .toArray();
      
    return books;
  }
  get_by_id = async (id) => {
    if (!CnxMongoDB.connection) return id ? {} : [];

    try {
      const book = await CnxMongoDB.db
        .collection("books")
        .findOne({ _id: new ObjectId(id) });

      return book;
    } catch (e) {
      throw e
    }


    
  };
  get_by_name = async (libro) => {
    if (!CnxMongoDB.connection) return libro ? {} : [];

    if (libro) {
      const book = await CnxMongoDB.db
          .collection("books")
          .findOne({ title: libro });
      return book;
  }

  return {};
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
    const updated = await this.get_by_id(id);
    return updated;
  };

  delete = async (id) => {
    if (!CnxMongoDB.connection) return {};

    const deleted = await this.get_by_id(id);
    await CnxMongoDB.db
      .collection("books")
      .deleteOne({ _id: new ObjectId(id) });
    return deleted;
  };
}

export default ModelMongoDB;
