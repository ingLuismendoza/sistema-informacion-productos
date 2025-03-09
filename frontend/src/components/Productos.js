import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import FormularioProducto from './FormularioProducto';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false); // Controla si el formulario está abierto
  const [productoEditando, setProductoEditando] = useState(null); // Almacena el producto que se está editando

  // Obtener productos desde el backend
  useEffect(() => {
    fetch('http://localhost:3001/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error obteniendo productos:', error));
  }, []);

  // Funciones para abrir y cerrar el formulario
  const handleShowForm = (producto = null) => {
    setProductoEditando(producto); // Si se pasa un producto, estamos editando; si no, estamos creando uno nuevo
    setShowForm(true); // Abre el formulario
  };

  const handleCloseForm = () => {
    setShowForm(false); // Cierra el formulario
    setProductoEditando(null); // Limpia el producto que se estaba editando
  };

  const actualizarListaProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error obteniendo productos:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <Button variant="success" onClick={() => handleShowForm()}>Crear Producto</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto._id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.categoria}</td>
              <td>{producto.cantidad}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowForm(producto)}>Editar</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Formulario para crear/editar productos */}
      <FormularioProducto
        show={showForm}
        handleClose={handleCloseForm}
        producto={productoEditando}
      />
    </div>
  );
};

export default Productos;