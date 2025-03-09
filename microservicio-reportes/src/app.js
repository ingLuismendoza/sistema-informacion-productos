const express = require("express");
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Cargar rutas
const routes = require("./routes");
app.use("/api", routes);

module.exports = app;