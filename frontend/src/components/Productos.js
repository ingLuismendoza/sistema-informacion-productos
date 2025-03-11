import React, { useState, useEffect } from "react";
import axios from "axios";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [numeroProducto, setNumeroProducto] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/productos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProductos(response.data);
  };

  const crearProducto = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/productos/crear",
      { nombre, descripcion, categoria, cantidad, numeroProducto },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    cargarProductos();
  };

  return (
    <div className="productos-container">
      <h2>Gestión de Productos</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Seleccione una categoría</option>
          <option value="fruta">Fruta</option>
          <option value="verdura">Verdura</option>
        </select>
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número del Producto"
          value={numeroProducto}
          onChange={(e) => setNumeroProducto(e.target.value)}
        />
        <button onClick={crearProducto}>Crear Producto</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Número del Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.categoria}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.numeroProducto}</td>
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

export default Productos;