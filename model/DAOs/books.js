import fs from "fs";

class BooksModel {
  constructor() {
    this.nombre = "books.json";
  }

  leerArchivo = async (nombre) => {
    let productos = undefined;

    try {
      productos = JSON.parse(await fs.promises.readFile(nombre, "utf8"));
    } catch (error) {
      throw new Error(`Error leyendo ${this.nombre}`);
    }

    return productos;
  };

  escribirArchivo = async (nombre, productos) => {
    try {
      await fs.promises.writeFile(
        nombre,
        JSON.stringify(productos, null, "\t")
      );
    } catch (error) {
      throw new Error(`Error escribiendo en ${this.nombre}`);
    }
  };

  getNext_Id(palabras) {
    let lg = palabras.length;
    return lg ? parseInt(palabras[lg - 1].id) + 1 : 1;
  }

  get = async (id) => {
    try {
      const productos = await this.leerArchivo(this.nombre);

      if (id != undefined) {
        const p = productos.find((p) => p.id == id);
        return p || {};
      } else {
        return productos;
      }
    } catch {
      return id ? {} : [];
    }
  };

  add = async (prod) => {
    try {

      /* Valido la cantidad de campos ingresados
      if(Object.keys(number).length > 1){ 
        return `Debe ingresar unicamente el campo numero`;
      }

      Valido los campos ingresados, las keys
      if (
        prod["titulo"] == undefined ||
        prod["autor"] == undefined ||
        prod["anio"] == undefined
      ) {
        return `Debe ingresar todos los datos`;
      } */

      const productos = await this.leerArchivo(this.nombre);

      prod.id = this.getNext_Id(productos);

      prod.title = prod.title;
      prod.autor = prod.autor;
      prod.available_quantity = parseInt(prod.available_quantity);

      productos.push(prod);
      await this.escribirArchivo(this.nombre, productos);

      return prod;
    } catch (err) {
      throw err.message;
    }
  };

  update = async (id, prod) => {
    try {
      prod.id = parseInt(id);
      const productos = await this.leerArchivo(this.nombre);

      const index = productos.findIndex((p) => p.id == id);

      if (index != -1) {
        const prodAnt = productos[index];

        const prodNuevo = { ...prodAnt, ...prod };

        productos.splice(index, 1, prodNuevo);
        await this.escribirArchivo(this.nombre, productos);

        return prodNuevo;
      } else {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }
    } catch (err) {
      throw err.message;
    }
  };

  delete = async (id) => {
    try {
      const productos = await this.leerArchivo(this.nombre);
      let prod = {};

      const index = productos.findIndex((p) => p.id == id);

      if (index == -1) {
        throw new Error(`No se encontró ningún libro con el ID ${id}`);
      }

      prod = productos.splice(index, 1)[0];
      await this.escribirArchivo(this.nombre, productos);
      return prod;
    } catch (err) {
      throw err.message;
    }
  };
}

export default BooksModel;
