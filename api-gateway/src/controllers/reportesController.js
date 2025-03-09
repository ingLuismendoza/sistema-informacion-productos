const express = require("express");
const router = express.Router();
const axios = require("axios");

// Ruta para generar un reporte
router.get("/generar", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4004/reportes/generar", { params: req.query });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

module.exports = router;