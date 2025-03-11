router.post("/registrar", authMiddleware, isPadre, async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptada,
      rol,
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario.", error });
  }
});