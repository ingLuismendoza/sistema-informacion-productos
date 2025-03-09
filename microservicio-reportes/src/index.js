const app = require("./app");

// Iniciar el servidor
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Microservicio de Reportes corriendo en http://localhost:${PORT}`);
});