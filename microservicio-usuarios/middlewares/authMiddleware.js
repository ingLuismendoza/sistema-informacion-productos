const jwt = require('jsonwebtoken');

const authMiddleware = (rolesPermitidos) => (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el rol del usuario está permitido
    if (rolesPermitidos && !rolesPermitidos.includes(decoded.rol)) {
      return res.status(403).send({ mensaje: 'Acceso denegado. No tienes permisos suficientes.' });
    }

    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).send({ mensaje: 'Token inválido' });
  }
};

module.exports = authMiddleware;