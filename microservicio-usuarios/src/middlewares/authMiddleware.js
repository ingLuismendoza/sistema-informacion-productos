const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, "secreto"); // Cambia "secreto" por la misma clave que usaste en el login
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

const isPadre = (req, res, next) => {
  if (req.user.rol !== "padre") {
    return res.status(403).json({ message: "Acceso denegado. Solo el Usuario Padre puede realizar esta acción." });
  }
  next();
};

const isRegistrador = (req, res, next) => {
  if (req.user.rol !== "registrador") {
    return res.status(403).json({ message: "Acceso denegado. Solo el Usuario Registrador puede realizar esta acción." });
  }
  next();
};

module.exports = { authMiddleware, isPadre, isRegistrador };