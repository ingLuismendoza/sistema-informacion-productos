const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['Padre', 'Registrador'],
    required: true,
  },
});

// Encriptar la contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (this.isModified('contraseña')) {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function (contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;