const express = require('express');
const Producto = require('../models/Producto');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Proteger todas las rutas de productos
router.use(authMiddleware(['Padre', 'Registrador']));

// Crear un producto (solo el usuario Padre puede hacerlo)
router.post('/productos', authMiddleware(['Padre']), async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Modificar un producto (solo el usuario Padre puede hacerlo)
router.put('/productos/:id', authMiddleware(['Padre']), async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).send({ mensaje: 'Producto no encontrado' });
    }
    res.send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un producto (solo el usuario Padre puede hacerlo)
router.delete('/productos/:id', authMiddleware(['Padre']), async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).send({ mensaje: 'Producto no encontrado' });
    }
    res.send({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;