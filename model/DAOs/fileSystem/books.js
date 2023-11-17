import fs from "fs";

class BookModel {
  constructor() {
    this.name = "data/books.json";
  }

  leerArchivo = async (name) => {
    let books = undefined;

    try {
      books = JSON.parse(await fs.promises.readFile(name, "utf8"));
    } catch (error) {
      throw new Error(`Error leyendo ${this.name}`);
    }

    return books;
  };

  escribirArchivo = async (name, books) => {
    try {
      await fs.promises.writeFile(
        name,
        JSON.stringify(books, null, "\t")
      );
    } catch (error) {
      throw new Error(`Error escribiendo en ${this.name}`);
    }
  };

  getNext_Id(books) {
    let lg = books.length;
    return lg ? parseInt(books[lg - 1].id) + 1 : 1;
  }

  get = async (id) => {
    try {
      const books = await this.leerArchivo(this.name);

      if (id != undefined) {
        const p = books.find((p) => p.id == id);
        return p || {};
      } else {
        return books;
      }
    } catch {
      return id ? {} : [];
    }
  };

  add = async (book) => {
    try {
      const books = await this.leerArchivo(this.name);

      book.id = this.getNext_Id(books);

      book.title = book.title;
      book.autor = book.autor;
      book.available_quantity = parseInt(book.available_quantity);

      books.push(book);
      await this.escribirArchivo(this.name, books);

      return prod;
    } catch (err) {
      throw err.message;
    }
  };

  update = async (id, book) => {
    try {
      book.id = parseInt(id);
      const books = await this.leerArchivo(this.name);

      const index = books.findIndex((p) => p.id == id);

      if (index != -1) {
        const old_book = books[index];

        const new_book = { ...old_book, ...book };

        books.splice(index, 1, new_book);
        await this.escribirArchivo(this.name, books);

        return new_book;
      } else {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }
    } catch (err) {
      throw err.message;
    }
  };

  delete = async (id) => {
    try {
      const books = await this.leerArchivo(this.name);
      let book = {};

      const index = books.findIndex((p) => p.id == id);

      if (index == -1) {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }

      book = books.splice(index, 1)[0];
      await this.escribirArchivo(this.name, books);
      return book;
    } catch (err) {
      throw err.message;
    }
  };
}

export default BookModel;
