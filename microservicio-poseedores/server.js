const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

// Importar y usar las rutas de poseedores
const poseedorRoutes = require('./routes/poseedorRoutes');
app.use('/api', poseedorRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Microservicio de Poseedores está funcionando');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Microservicio de Poseedores corriendo en http://localhost:${PORT}`);
});