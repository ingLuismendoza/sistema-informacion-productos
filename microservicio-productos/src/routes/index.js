const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");
const { authMiddleware, isPadre } = require("../middleware/authMiddleware");

// Solo el Usuario Padre puede crear, modificar o eliminar productos
router.post("/crear", authMiddleware, isPadre, productosController.crearProducto);
router.put("/:id", authMiddleware, isPadre, productosController.modificarProducto);
router.delete("/:id", authMiddleware, isPadre, productosController.eliminarProducto);

module.exports = router;