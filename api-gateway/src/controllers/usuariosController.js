const express = require("express");
const router = express.Router();
const axios = require("axios");

// Ruta para registrar un usuario
router.post("/registrar", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:4001/usuarios/registrar", req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:4001/usuarios/login", req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;