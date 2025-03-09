const express = require("express");
const router = express.Router();
const axios = require("axios");

// Ruta para crear un producto
router.post("/crear", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:4002/productos/crear", req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;