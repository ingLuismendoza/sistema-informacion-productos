const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas de usuario
app.use('/api', usuarioRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Microservicio de Usuarios corriendo en http://localhost:${PORT}`);
});