const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Ruta para registrar un usuario
router.post("/registrar", async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptada,
      rol,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Responder con éxito
    res.status(201).json({ message: "Usuario registrado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario.", error });
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      "secreto", // Cambia "secreto" por una clave segura
      { expiresIn: "1h" }
    );

    // Responder con el token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión.", error });
  }
});

module.exports = router;