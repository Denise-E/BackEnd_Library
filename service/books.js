import BookModel from "../model/DAOs/books.js";
import { validate } from "./validations/books_validations.js"

class BookService {
  constructor() {
    this.model = new BookModel();
  }

  get_by_name = async (libro) => {
    return await this.model.get_by_name(libro);
  };

  get = async (id) => {
    return await this.model.get(id);
  };

  add = async (book) => {
    const valid = validate(book)
    if(valid.result) {
      return await this.model.add(book);
    } else {
        console.log(valid.error)
        return undefined
    }
  };

  update = async (id, book) => {
    const valid = validate(book)
    if(valid.result) {
      return await this.model.update(id, book);
    } else {
      console.log(valid.error)
      return undefined
    }
  };

  delete = async (id) => {
    return await this.model.delete(id);
  };
}

export default BookService;
