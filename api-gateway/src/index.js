// Importar dependencias
const express = require("express");
const app = express();
const routes = require("./routes");

// Configurar middleware para parsear JSON
app.use(express.json());

// Cargar rutas
app.use("/api", routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});