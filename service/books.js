import BookModel from "../model/DAOs/books.js";
import { validate } from "./validations/books_validations.js"
import Errors from "./service_errors.js";


class BookService {
  constructor() {
    this.model = new BookModel();
  }

  //No toco este por que no se donde pega bien
  get_by_name = async (libro) => {
    return await this.model.get_by_name(libro);
  };

  get = async (id) => {
    if (id){
      try{
        let result = await this.model.get_by_id(id);
        if (result == null) {
          throw new Errors.NotFoundError("No se encontro ningun libro con el ID")
        }
        return result
      } catch (e) {
        if (e.constructor.name === "BSONError") {
          throw new Errors.InvalidParameterError("El parametro es invalido")
        } else {
          throw e
        }
      }
    } else {
      try {
        return await this.model.get_all();
      } catch (e) {
        throw e
      }
      }
  };

  add = async (book) => {
    const valid = validate(book)

    if(valid.result == false) {
      throw new Errors.ValidationError("El libro recibido no es valido")
    }
    return await this.model.add(book);
  };

  update = async (id, book) => {
    try {
      await this.get(id)
    } catch (e){
      throw e
    }
    const validBook = validate(book)
    if(!validBook.result) {
      throw new Errors.ValidationError("El libro recibido no es valido")
    }
    try {
      return await this.model.update(id, book);
    } catch (e) {
      throw e
    }
  };

  delete = async (id) => {
    try {
      await this.get(id)
    } catch (e){
      throw e
    }
    try {
      return await this.model.delete(id);
    } catch (e) {
      throw e
    }
  };
}
export default BookService;

