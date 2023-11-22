import ReservationModel from "../model/DAOs/reservations.js";
import BooksService from "./books.js";
import UsersService from "./users.js";
import { validate } from "./validations/reservations_validations.js"

class ReservationService {
  constructor() {
    this.model = new ReservationModel();
    this.booksService = new BooksService();
    this.usersService = new UsersService();
  }

  get = async (id) => {
    // Trae todas (o una) reservaciones
    const reservation = await this.model.get(id);
  
    if (Array.isArray(reservation)) {
      // Si es un array de reservas
      const result = await Promise.all(reservation.map(async (reserva) => {
        const client = await this.usersService.get(reserva.id_client);
        const book = await this.booksService.get(reserva.id_book);
  
        return {
          _id: reserva._id,
          cliente: client ? client.name : 'Cliente no encontrado',
          libro: book ? book.title : 'Libro no encontrado'
        };
      }));
  
      return result;
    } else if (reservation) {
      // Si es una sola reserva
      const client = await this.usersService.get(reservation.id_client);
      const book = await this.booksService.get(reservation.id_book);
  
      return {
        _id: reservation._id,
        cliente: client ? client.name : 'Cliente no encontrado',
        libro: book ? book.title : 'Libro no encontrado'
      };
    } else {
      // Si no hay reservas
      return {};
    }
  };

  add = async (res) => {
    const valid = validate(res)
    if (valid.result) {
      const user = await this.usersService.get_by_email(res.user_email);
      if (user) {
        const book = await this.booksService.get(res.id_book);
        const nuevaReserva = {
          id_client: user._id,
          id_book: book._id
        };
        return await this.model.add(nuevaReserva);
  
      }else{
        console.error('Usuario no encontrado con el email proporcionado.');
        return {};
      }
    } else {
      console.log(res.error)
      return undefined
    }
  };

 

  update = async (id, res) => {
    const valid = validate(res)
    if (valid) {
      const user = await this.usersService.get_by_email(res.user_email);
      const book = await this.booksService.get_by_name(res.libro);
      const nuevaReserva = {
        id_client: user._id,
        id_book: book._id
      };
      return await this.model.update(id, nuevaReserva);
    } else {
      console.log(valid.error)
      return undefined
    }
  };

  delete = async (id) => {
    const res = await this.model.get(id);

    // Book quantity update
    const book = await this.booksService.get(res.id_book);
    const id_param = book.id
    delete book._id
    book.stock += 1;
    await this.booksService.update(id_param, book);

    // When the book is returned, the reservation is deleted
    return await this.model.delete(id);
  };
}

export default ReservationService;
