// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Crear la aplicación Express
const app = express();

// Middleware para permitir solicitudes desde el frontend
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Importar y usar las rutas de productos
const productoRoutes = require('./routes/productoRoutes');
app.use('/api', productoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Microservicio de Productos está funcionando');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Microservicio de Productos corriendo en http://localhost:${PORT}`);
});