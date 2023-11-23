import ReservationModel from "../model/DAOs/reservations.js";
import BooksService from "./books.js";
import UsersService from "./users.js";
import { validate } from "./validations/reservations_validations.js"
import Errors from "./service_errors.js";

class ReservationService {
  constructor() {
    this.model = new ReservationModel();
    this.booksService = new BooksService();
    this.usersService = new UsersService();
  }

  get = async (id) => {
    try{
      if (id) {
        const reservation = await this.model.get_by_id(id);
        if (reservation == null) {
          throw new Errors.NotFoundError("no se encontro la reserva")
        }
        const client = await this.usersService.get(reservation.id_client);
        const book = await this.booksService.get(reservation.id_book);

    
        return {
          _id: reservation._id,
          cliente: client.name,
          libro: book.title 
        };
      } else {
        const reservation = await this.model.get_all(id);
        const result = await Promise.all(reservation.map(async (reserva) => {
        const client = await this.usersService.get(reserva.id_client);
        const book = await this.booksService.get(reserva.id_book);
    
        return {
          _id: reserva._id,
          cliente: client.name,
          libro: book.title
        }; 
        }));
    
        return result;
      }
    } catch (e) {
      if (e.constructor.name === "BSONError") {
        throw new Errors.InvalidParameterError("El parametro es invalido")
      } else {
        throw e
      }
    }
  };

  add = async (res) => {
    try {
      const valid = validate(res)
      if (!valid.result) {
        throw new Errors.ValidationError("la reserva no es valida")
      }
      const user = await this.usersService.get_by_email(res.user_email);
      if (user == null) {
        throw new Errors.NotFoundError("no se encontro al usuario")
      }
    
      const book = await this.booksService.get(res.id_book);

      const nuevaReserva = {
        id_client: user._id,
        id_book: book._id
      };
      
      const id_param = book._id
      delete book._id
      book.stock -= 1;
      await this.booksService.update(id_param, book);
      
      
      return await this.model.add(nuevaReserva);
    } catch (e) {
      throw e
    }
  };

 

  update = async (id, res) => {
    try {
      const valid = validate(res)
      if (!valid.result) {
        throw new Errors.ValidationError("la reserva no es valida")
      } 
      const user = await this.usersService.get_by_email(res.user_email);
      if (user == null) {
        throw new Errors.NotFoundError("no se encontro al usuario")
      }
      const book = await this.booksService.get_by_name(res.libro);
      const nuevaReserva = {
        id_client: user._id,
        id_book: book._id
      };
      return await this.model.update(id, nuevaReserva);
    } catch (e) {
    throw e
    }

  };

  delete = async (id) => {
    try{
      console.log("Linea 110", id)
      const res = await this.get(id);
      console.log("Linea 112", res.libro._id)
      // Book quantity update
      const book = await this.booksService.get(res.libro._id);
      const id_param = book._id
      delete book._id
      book.stock += 1;
      await this.booksService.update(id_param, book);
  
      // When the book is returned, the reservation is deleted
      return await this.model.delete(id);
    } catch (e) {
      throw e
    }

  };
}

export default ReservationService;
