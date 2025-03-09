const express = require("express");
const router = express.Router();
const Poseedor = require("../models/Poseedor");

// Ruta para crear un poseedor
router.post("/crear", async (req, res) => {
  try {
    const nuevoPoseedor = new Poseedor(req.body);
    await nuevoPoseedor.save();
    res.status(201).json({ message: "Poseedor creado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el poseedor.", error });
  }
});

// Ruta para asignar productos a un poseedor
router.post("/asignar-productos", async (req, res) => {
  try {
    const { poseedorId, productos } = req.body;

    // Verificar si el poseedor existe
    const poseedor = await Poseedor.findById(poseedorId);
    if (!poseedor) {
      return res.status(404).json({ message: "Poseedor no encontrado." });
    }

    // Asignar productos
    poseedor.productosAsignados = productos;
    await poseedor.save();

    res.status(200).json({ message: "Productos asignados correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar productos.", error });
  }
});

// Ruta para obtener todos los poseedores
router.get("/", async (req, res) => {
  try {
    const poseedores = await Poseedor.find();
    res.status(200).json(poseedores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los poseedores.", error });
  }
});

module.exports = router;