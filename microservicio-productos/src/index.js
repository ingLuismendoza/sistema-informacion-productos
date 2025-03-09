const app = require("./app");

// Iniciar el servidor
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Microservicio de Productos corriendo en http://localhost:${PORT}`);
});