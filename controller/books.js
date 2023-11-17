import BookService from "../service/books.js";

class BookController {
  constructor() {
    this.service = new BookService();
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;

      let productos = await this.service.get(id);
      res.json(productos);
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
    try {
      let prod = req.body;

      const added = await this.service.add(prod);
      res.json(added);
      //.redirect('/');
    } catch (error) {
      console.log("Error al crear libro: ", error);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const prod = req.body;

      const producto = await this.service.update(id, prod);
      res.json(producto);
    } catch (error) {
      console.log("Error al actualizar libro: ", error);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const prod = await this.service.delete(id);
      res.json(prod);
    } catch (error) {
      console.log("Error al eliminar libro: ", error);
    }
  };
}

export default BookController;
