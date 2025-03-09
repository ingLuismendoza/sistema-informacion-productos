const mongoose = require('mongoose');

// Definir el esquema del poseedor
const poseedorSchema = new mongoose.Schema({
  departamento: {
    type: String,
    required: true,
  },
  municipio: {
    type: String,
    required: true,
  },
  lugarResidencia: {
    type: String,
    required: true,
  },
  primerNombre: {
    type: String,
    required: true,
  },
  segundoNombre: {
    type: String,
  },
  primerApellido: {
    type: String,
    required: true,
  },
  segundoApellido: {
    type: String,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: true,
  },
  productosAsignados: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  condicionVictima: {
    type: Boolean,
    required: true,
  },
  numeroUnico: {
    type: String,
    unique: true,
  },
});

// Crear el modelo de Poseedor
const Poseedor = mongoose.model('Poseedor', poseedorSchema);

module.exports = Poseedor;