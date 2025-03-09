const express = require("express");
const router = express.Router();
const Producto = require("../models/Producto");

// Ruta para crear un producto
router.post("/crear", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json({ message: "Producto creado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto.", error });
  }
});

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos.", error });
  }
});

// Ruta para modificar un producto
router.put("/:id", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    res.status(200).json({ message: "Producto actualizado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto.", error });
  }
});

// Ruta para eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    res.status(200).json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto.", error });
  }
});

module.exports = router;