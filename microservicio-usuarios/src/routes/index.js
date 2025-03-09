const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Rutas para usuarios
router.use("/usuarios", usuariosController);

module.exports = router;