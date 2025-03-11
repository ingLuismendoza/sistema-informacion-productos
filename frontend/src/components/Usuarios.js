import React, { useState, useEffect } from "react";
import axios from "axios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsuarios(response.data);
  };

  const crearUsuario = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/usuarios/registrar",
      { nombre, email, password: contraseña, rol: "registrador" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    cargarUsuarios();
  };

  return (
    <div className="usuarios-container">
      <h2>Gestión de Usuarios</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button onClick={crearUsuario}>Crear Usuario</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;