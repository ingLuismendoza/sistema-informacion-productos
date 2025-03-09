const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect("mongodb://localhost:27017/usuarios", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Cargar rutas
const routes = require("./routes");
app.use("/api", routes);

module.exports = app;