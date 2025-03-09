const express = require('express');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registrar un nuevo usuario
router.post('/registrar', async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).send({ mensaje: 'El correo ya está registrado' });
    }

    // Crear el usuario
    const usuario = new Usuario({ nombre, correo, contraseña, rol });
    await usuario.save();

    // Generar token JWT
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).send({ usuario, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).send({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const contraseñaValida = await usuario.compararContraseña(contraseña);
    if (!contraseñaValida) {
      return res.status(400).send({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.send({ usuario, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;