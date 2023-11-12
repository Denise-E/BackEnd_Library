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
      console.log("error al obtener datos ", error);
    }
  };
  get_suggestions = (req, res) => {
    
    fetch('https://653062896c756603295e947b.mockapi.io/api/books')
    .then(res =>  {
      return res.json()})
    .then(data => {
      res.json([...data]);
    }
      )
    .catch(err => {
      return err
    })

  };

  add = async (req, res) => {
    try {
      let prod = req.body;

      const added = await this.service.add(prod);
      res.json(added);
      //.redirect('/');
    } catch (error) {
      console.log("error al crear", error);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const prod = req.body;

      const producto = await this.service.update(id, prod);
      res.json(producto);
    } catch (error) {
      console.log("error al actualizar ", error);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const prod = await this.service.delete(id);
      res.json(prod);
    } catch (error) {
      console.log("error al eliminar s", error);
    }
  };
}

export default BookController;