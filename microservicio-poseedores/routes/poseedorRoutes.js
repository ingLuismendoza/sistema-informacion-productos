const express = require('express');
const Poseedor = require('../models/Poseedor');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Proteger todas las rutas de poseedores
router.use(authMiddleware(['Padre', 'Registrador']));

// Crear un poseedor (solo el usuario Registrador puede hacerlo)
router.post('/poseedores', authMiddleware(['Registrador']), async (req, res) => {
  try {
    const poseedor = new Poseedor(req.body);
    await poseedor.save();
    res.status(201).send(poseedor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los poseedores
router.get('/poseedores', async (req, res) => {
  try {
    const poseedores = await Poseedor.find();
    res.send(poseedores);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Modificar un poseedor (solo el usuario Registrador puede hacerlo)
router.put('/poseedores/:id', authMiddleware(['Registrador']), async (req, res) => {
  try {
    const poseedor = await Poseedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!poseedor) {
      return res.status(404).send({ mensaje: 'Poseedor no encontrado' });
    }
    res.send(poseedor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un poseedor (solo el usuario Registrador puede hacerlo)
router.delete('/poseedores/:id', authMiddleware(['Registrador']), async (req, res) => {
  try {
    const poseedor = await Poseedor.findByIdAndDelete(req.params.id);
    if (!poseedor) {
      return res.status(404).send({ mensaje: 'Poseedor no encontrado' });
    }
    res.send({ mensaje: 'Poseedor eliminado correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;