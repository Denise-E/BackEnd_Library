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

  add = async (res) => {
    return await this.model.add(res);
  };

  update = async (id, res) => {
    return await this.model.update(id, res);
  };

  delete = async (id) => {
    const res = await this.model.get(id);

    // Book quantity update
    const book = await this.booksService.get(res.id_book);
    book.available_quantity += 1;
    await this.booksService.update(book.id, book);

    // When the book is returned, the reservation is deleted
    return await this.model.delete(id);
  };
}

export default ReservationService;
