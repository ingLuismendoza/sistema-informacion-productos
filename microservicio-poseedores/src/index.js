const app = require("./app");

// Iniciar el servidor
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Microservicio de Poseedores corriendo en http://localhost:${PORT}`);
});