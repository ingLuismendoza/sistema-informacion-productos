import React, { useState, useEffect } from "react";
import axios from "axios";

const Poseedores = () => {
  const [poseedores, setPoseedores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [condicionVictima, setCondicionVictima] = useState(false);

  useEffect(() => {
    cargarPoseedores();
  }, []);

  const cargarPoseedores = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/poseedores", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPoseedores(response.data);
  };

  const crearPoseedor = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/poseedores/crear",
      { nombre, documento, telefono, condicionVictima },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    cargarPoseedores();
  };

  return (
    <div className="poseedores-container">
      <h2>Gestión de Poseedores</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <label>
          Condición de Víctima:
          <input
            type="checkbox"
            checked={condicionVictima}
            onChange={(e) => setCondicionVictima(e.target.checked)}
          />
        </label>
        <button onClick={crearPoseedor}>Crear Poseedor</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Condición de Víctima</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {poseedores.map((poseedor) => (
            <tr key={poseedor._id}>
              <td>{poseedor.nombre}</td>
              <td>{poseedor.documento}</td>
              <td>{poseedor.telefono}</td>
              <td>{poseedor.condicionVictima ? "Sí" : "No"}</td>
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

export default Poseedores;