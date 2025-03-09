import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const Poseedores = () => {
  const [poseedores, setPoseedores] = useState([]);

  // Obtener poseedores desde el backend
  useEffect(() => {
    fetch('http://localhost:3002/api/poseedores')
      .then(response => response.json())
      .then(data => setPoseedores(data))
      .catch(error => console.error('Error obteniendo poseedores:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Poseedores</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {poseedores.map(poseedor => (
            <tr key={poseedor._id}>
              <td>{poseedor.primerNombre} {poseedor.primerApellido}</td>
              <td>{poseedor.cedula}</td>
              <td>{poseedor.telefono}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Poseedores;