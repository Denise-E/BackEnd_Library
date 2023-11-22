import BookService from "../service/books.js";
import Errors from "../service/service_errors.js";

class BookController {
  constructor() {
    this.service = new BookService();
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;

      let books = await this.service.get(id);
      res.status(200).json(books);
    } catch (error) {
      if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else if (error instanceof Errors.InvalidParameterError) {
        res.status(400).json({ error: "el parametro es invalido" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
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
      let book = req.body;

      const added = await this.service.add(book);
      res.status(201).json({ data: added });
      
    } catch (error) {
      if (error instanceof Errors.ValidationError) {
        res.status(400).json({ error: "el libro no es valido para crear" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const book = req.body;

      const updated = await this.service.update(id, book);
      res.status(200).json(updated);
    } catch (error) {
      if (error instanceof Errors.ValidationError) {
        res.status(400).json({ error: "el libro enviado no es valido para actualizar" })
      } else if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } 
      else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);
      res.status(201).json(deleted);
    } catch (error) {
      if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
    }
  };

export default BookController;
