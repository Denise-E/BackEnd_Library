import BookModel from "../model/DAOs/books.js";
import { validate } from "./validations/books_validations.js"
import ValidationError from "./service_errors.js";

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
      //Aca solo tiro este error para que lo levante el controller
      console.log(valid.error)
      throw new ValidationError("El libro recibido no es valido")
    }
  };

  update = async (id, book) => {
    const valid = validate(book)
    if(valid.result) {
      return await this.model.update(id, book);
    } else {
      console.log(valid.error)
      throw new ValidationError("El libro recibido no es valido")
    }
  };

  delete = async (id) => {
    return await this.model.delete(id);
  };
}

export default BookService;

