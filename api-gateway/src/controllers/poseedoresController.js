const express = require("express");
const router = express.Router();
const axios = require("axios");

// Ruta para crear un poseedor
router.post("/crear", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:4003/poseedores/crear", req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Ruta para asignar productos a un poseedor
router.post("/asignar-productos", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:4003/poseedores/asignar-productos", req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;