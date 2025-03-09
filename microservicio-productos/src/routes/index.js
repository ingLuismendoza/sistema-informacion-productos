const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

// Rutas para productos
router.use("/productos", productosController);

module.exports = router;