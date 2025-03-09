const mongoose = require('mongoose');

// Definir el esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ['fruta', 'verdura'],
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  numeroProducto: {
    type: String,
    required: true,
    unique: true,
  },
});

// Crear el modelo de Producto
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;