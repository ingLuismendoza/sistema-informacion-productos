const express = require("express");
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware de autenticación (lo implementaremos más adelante)
const authMiddleware = require("./middleware/authMiddleware");
app.use(authMiddleware);

module.exports = app;