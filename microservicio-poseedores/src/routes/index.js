const express = require("express");
const router = express.Router();
const poseedoresController = require("../controllers/poseedoresController");

// Rutas para poseedores
router.use("/poseedores", poseedoresController);

module.exports = router;