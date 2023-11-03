import express from "express";
import Router from "./router/router.js";

const app = express();
//app.use(express.urlencoded({ extended:true})); Para forms
app.use(express.json());
app.use(express.static("public"));

const router = new Router();

// Routes
app.use("/api/obj", router.start());

// Server
const PORT = 8080;

const server = app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(`Error en servidor ${err.message}`));
