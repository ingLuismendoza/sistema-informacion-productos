const app = require("./app");

// Iniciar el servidor
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Microservicio de Usuarios corriendo en http://localhost:${PORT}`);
});