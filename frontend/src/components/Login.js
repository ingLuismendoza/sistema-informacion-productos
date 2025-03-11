import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: usuario,
        password: contraseña,
      });

      const { token, rol } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem("token", token);

      // Redirigir según el rol
      if (rol === "padre") {
        navigate("/usuarios");
      } else if (rol === "registrador") {
        navigate("/poseedores");
      }
    } catch (error) {
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;