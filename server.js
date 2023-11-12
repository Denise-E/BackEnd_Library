import express from "express";
import BookRouter from "./router/books.js";
import ReservationRouter from "./router/reservations.js";
import UserRouter from "./router/users.js";

const app = express();
app.use(express.urlencoded({ extended:true})); //Para forms
app.use(express.json());
app.use(express.static("public"));

const routerBook = new BookRouter();
const routerReservation = new ReservationRouter();
const routerUser = new UserRouter();

// Routes
app.use("/api/books", routerBook.start());
app.use("/api/reservations", routerReservation.start());
app.use("/api/users", routerUser.start());

// Server
const PORT = 8080;

const server = app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(`Error en servidor ${err.message}`));
