import BookModel from "../model/DAOs/books.js";

class BookService {
  constructor() {
    this.model = new BookModel();
  }

  get = async (id) => {
    return await this.model.get(id);
  };

  add = async (prod) => {
    return await this.model.add(prod);
  };

  update = async (id, prod) => {
    return await this.model.update(id, prod);
  };

  delete = async (id) => {
    return await this.model.delete(id);
  };

}

export default BookService;
