import BookService from "../service/books.js";
import ValidationError from "../service/service_errors.js";

class BookController {
  constructor() {
    this.service = new BookService();
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;

      let books = await this.service.get(id);
      res.json(books);
    } catch (error) {
      console.log("Error al obtener libros: ", error);
    }
  };
  
  get_suggestions = (req, res) => {
    fetch("https://653062896c756603295e947b.mockapi.io/api/books")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        res.json([...data]);
      })
      .catch((err) => {
        console.log("Error al obtener libros externos: ", err.message);
        return err;
      });
  };

  add = async (req, res) => {
    //En el try queda solo el caso exitoso
    try {
      console.log("METHOD")
      let book = req.body;

      const added = await this.service.add(book);
      res.status(201)
      res.json(added);
      
    } catch (error) {
      //Con un instanceof chequeo  el tipo y retornamos el error asi
      if (error instanceof ValidationError) {
        res.status(400)
        res.json("error: el libro no es valido para crear")
      } else {
        res.status(500)
        res.json("error: ha ocurrido un error inesperado", error)
      }
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const book = req.body;

      const updated = await this.service.update(id, book);
      res.json(updated);
    } catch (error) {
      console.log("Error al actualizar libro: ", error);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.service.delete(id);
      res.json(deleted);
    } catch (error) {
      console.log("Error al eliminar libro: ", error);
    }
  };
}

export default BookController;
