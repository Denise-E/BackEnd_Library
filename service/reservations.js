import ReservationModel from "../model/DAOs/reservations.js";
import BooksService from "./books.js";

class ReservationService {
  constructor() {
    this.model = new ReservationModel();
    this.booksService = new BooksService();
  }

  get = async (id) => {
    return await this.model.get(id);
  };

  get_by_user = async (id) => {
    return await this.model.get_by_user(id);
  };

  add = async (prod) => {
    return await this.model.add(prod);
  };

  update = async (id, prod) => {
    return await this.model.update(id, prod);
  };

  delete = async (id) => { 
    const res = await this.model.get(id)
    const book = await this.booksService.get(res.id_book)
    book.available_quantity += 1
    await this.booksService.update(book.id, book) 

    return await this.model.delete(id);
  };

}

export default ReservationService;
