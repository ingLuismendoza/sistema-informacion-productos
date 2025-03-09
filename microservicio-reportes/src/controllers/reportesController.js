const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const axios = require("axios");

// Ruta para generar un reporte
router.get("/generar", async (req, res) => {
  try {
    // Obtener parámetros de filtro
    const { producto, documento, numeroUnico, condicionVictima } = req.query;

    // Obtener datos de poseedores desde el microservicio de poseedores
    const poseedoresResponse = await axios.get("http://localhost:4003/api/poseedores", {
      params: { producto, documento, numeroUnico, condicionVictima },
    });
    const poseedores = poseedoresResponse.data;

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte de Poseedores");

    // Definir las columnas del reporte
    worksheet.columns = [
      { header: "Número Único", key: "numeroUnico", width: 20 },
      { header: "Nombre Completo", key: "nombreCompleto", width: 30 },
      { header: "Documento", key: "documento", width: 15 },
      { header: "Productos Asignados", key: "productosAsignados", width: 40 },
      { header: "Condición de Víctima", key: "condicionVictima", width: 20 },
    ];

    // Llenar el reporte con datos
    poseedores.forEach((poseedor) => {
      const nombreCompleto = `${poseedor.nombres.primerNombre} ${poseedor.nombres.segundoNombre} ${poseedor.apellidos.primerApellido} ${poseedor.apellidos.segundoApellido}`;
      const productosAsignados = poseedor.productosAsignados
        .map((producto) => `${producto.productoId} (${producto.cantidad})`)
        .join(", ");

      worksheet.addRow({
        numeroUnico: poseedor.numeroUnico,
        nombreCompleto,
        documento: poseedor.documento,
        productosAsignados,
        condicionVictima: poseedor.condicionVictima ? "Sí" : "No",
      });
    });

    // Configurar la respuesta para descargar el archivo Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reporte_poseedores.xlsx"
    );

    // Escribir el archivo Excel en la respuesta
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Error al generar el reporte.", error });
  }
});

module.exports = router;