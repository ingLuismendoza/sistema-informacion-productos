const express = require("express");
const router = express.Router();
const reportesController = require("../controllers/reportesController");

// Rutas para reportes
router.use("/reportes", reportesController);

module.exports = router;