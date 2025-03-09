import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';

const FormularioPoseedor = ({ show, handleClose, poseedor, actualizarLista }) => {
  // Estados para los campos del formulario
  const [primerNombre, setPrimerNombre] = useState(poseedor ? poseedor.primerNombre : '');
  const [segundoNombre, setSegundoNombre] = useState(poseedor ? poseedor.segundoNombre : '');
  const [primerApellido, setPrimerApellido] = useState(poseedor ? poseedor.primerApellido : '');
  const [segundoApellido, setSegundoApellido] = useState(poseedor ? poseedor.segundoApellido : '');
  const [cedula, setCedula] = useState(poseedor ? poseedor.cedula : '');
  const [telefono, setTelefono] = useState(poseedor ? poseedor.telefono : '');
  const [departamento, setDepartamento] = useState(poseedor ? poseedor.departamento : '');
  const [municipio, setMunicipio] = useState(poseedor ? poseedor.municipio : '');
  const [lugarResidencia, setLugarResidencia] = useState(poseedor ? poseedor.lugarResidencia : '');
  const [fechaNacimiento, setFechaNacimiento] = useState(poseedor ? poseedor.fechaNacimiento : '');
  const [sexo, setSexo] = useState(poseedor ? poseedor.sexo : '');
  const [condicionVictima, setCondicionVictima] = useState(poseedor ? poseedor.condicionVictima : false);

  // Estados para la confirmación y el mensaje
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!primerNombre || !primerApellido || !cedula || !telefono || !departamento || !municipio || !lugarResidencia || !fechaNacimiento || !sexo) {
      setMensaje({ tipo: 'danger', texto: 'Todos los campos son obligatorios' });
      return;
    }

    setMostrarConfirmacion(true); // Muestra la confirmación
  };

  // Función para guardar el poseedor
  const guardarPoseedor = async () => {
    const poseedorData = {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      cedula,
      telefono,
      departamento,
      municipio,
      lugarResidencia,
      fechaNacimiento,
      sexo,
      condicionVictima,
    };

    try {
      let response;
      if (poseedor) {
        response = await fetch(`http://localhost:3002/api/poseedores/${poseedor._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(poseedorData),
        });
      } else {
        response = await fetch('http://localhost:3002/api/poseedores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(poseedorData),
        });
      }

      if (!response.ok) {
        throw new Error('Error al guardar el poseedor');
      }

      setMensaje({ tipo: 'success', texto: 'Poseedor guardado correctamente' });
      setMostrarConfirmacion(false); // Cierra la confirmación
      handleClose(); // Cierra el formulario
      actualizarLista(); // Actualiza la lista de poseedores
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: 'Error al guardar el poseedor' });
      console.error('Error:', error);
    }
  };

  return (
    <>
      {/* Modal del formulario */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{poseedor ? 'Editar Poseedor' : 'Crear Poseedor'}</Modal.Title>
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
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control
                type="text"
                value={primerNombre}
                onChange={(e) => setPrimerNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control
                type="text"
                value={segundoNombre}
                onChange={(e) => setSegundoNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Primer Apellido</Form.Label>
              <Form.Control
                type="text"
                value={primerApellido}
                onChange={(e) => setPrimerApellido(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Segundo Apellido</Form.Label>
              <Form.Control
                type="text"
                value={segundoApellido}
                onChange={(e) => setSegundoApellido(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="text"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Municipio</Form.Label>
              <Form.Control
                type="text"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lugar de Residencia</Form.Label>
              <Form.Control
                type="text"
                value={lugarResidencia}
                onChange={(e) => setLugarResidencia(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sexo</Form.Label>
              <Form.Control
                as="select"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Condición de Víctima del Conflicto</Form.Label>
              <Form.Check
                type="checkbox"
                label="Sí"
                checked={condicionVictima}
                onChange={(e) => setCondicionVictima(e.target.checked)}
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
          <Button variant="primary" onClick={guardarPoseedor}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormularioPoseedor;