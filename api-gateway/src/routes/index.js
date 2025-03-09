const express = require("express");
const router = express.Router();

// Importar controladores
const usuariosController = require("../controllers/usuariosController");
const productosController = require("../controllers/productosController");
const poseedoresController = require("../controllers/poseedoresController");
const reportesController = require("../controllers/reportesController");

// Rutas para usuarios
router.use("/usuarios", usuariosController);

// Rutas para productos
router.use("/productos", productosController);

// Rutas para poseedores
router.use("/poseedores", poseedoresController);

// Rutas para reportes
router.use("/reportes", reportesController);

module.exports = router;