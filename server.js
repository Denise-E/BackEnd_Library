import express from "express";
import BookRouter from "./router/books.js";
import ReservationRouter from "./router/reservations.js";
import UserRouter from "./router/users.js";
import config from "./config.js";
import CnxMongoDB from "./model/DBMongo.js";
import swagger from "./swagger.js";

const app = express();
const routerBook = new BookRouter();
const routerReservation = new ReservationRouter();
const routerUser = new UserRouter();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/books", routerBook.start());
app.use("/api/reservations", routerReservation.start());
app.use("/api/users", routerUser.start());

// -----------------------------------------------
//        LISTEN DEL SERVIDOR EXPRESS
// -----------------------------------------------
if (config.MODO_PERSISTENCIA == "MONGODB") {
  await CnxMongoDB.conectar();
}

// Server
const PORT = 8080;

const server = app.listen( PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`),
  swagger.swaggerDocs(app, PORT)
});

server.on("error", (err) => console.log(`Error en servidor ${err.message}`));
