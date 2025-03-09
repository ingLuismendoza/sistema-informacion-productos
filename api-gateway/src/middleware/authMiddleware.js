const jwt = require("jsonwebtoken");

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token del header
  const token = req.header("Authorization");

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, "secreto"); // Cambia "secreto" por una clave segura
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;