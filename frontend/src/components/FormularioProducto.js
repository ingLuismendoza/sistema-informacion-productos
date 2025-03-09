import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';

const FormularioProducto = ({ show, handleClose, producto, actualizarLista }) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(producto ? producto.nombre : '');
  const [descripcion, setDescripcion] = useState(producto ? producto.descripcion : '');
  const [categoria, setCategoria] = useState(producto ? producto.categoria : '');
  const [cantidad, setCantidad] = useState(producto ? producto.cantidad : '');

  // Estados para la confirmación y el mensaje
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !categoria || !cantidad) {
      setMensaje({ tipo: 'danger', texto: 'Todos los campos son obligatorios' });
      return;
    }

    setMostrarConfirmacion(true); // Muestra la confirmación
  };

  // Función para guardar el producto
  const guardarProducto = async () => {
    const productoData = {
      nombre,
      descripcion,
      categoria,
      cantidad: parseInt(cantidad, 10),
    };

    try {
      let response;
      if (producto) {
        response = await fetch(`http://localhost:3001/api/productos/${producto._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productoData),
        });
      } else {
        response = await fetch('http://localhost:3001/api/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productoData),
        });
      }

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      setMensaje({ tipo: 'success', texto: 'Producto guardado correctamente' });
      setMostrarConfirmacion(false); // Cierra la confirmación
      handleClose(); // Cierra el formulario
      actualizarLista(); // Actualiza la lista de productos
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: 'Error al guardar el producto' });
      console.error('Error:', error);
    }
  };

  return (
    <>
      {/* Modal del formulario */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{producto ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Mensaje de éxito o error */}
          {mensaje.texto && (
            <Alert variant={mensaje.tipo}>
              {mensaje.texto}
            </Alert>
          )}

          {/* Formulario */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Seleccione una categoría</option>
                <option value="fruta">Fruta</option>
                <option value="verdura">Verdura</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmación */}
      <Modal show={mostrarConfirmacion} onHide={() => setMostrarConfirmacion(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas guardar los cambios?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarConfirmacion(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormularioProducto;