import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import CampoEntrada from './components/CampoEntrada';

const URL_API = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

function Aplicacion() {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', identificacion: '', direccion: '', correo: '' });

  useEffect(() => {
    axios.get(URL_API)
      .then(response => setEmpleados(response.data))
      .catch(error => console.error('Error al obtener empleados:', error));
  }, []);


  const manejarCambioEntrada = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado({ ...nuevoEmpleado, [name]: value });
  };


  const validarFormulario = () => {
    const { nombre, identificacion, direccion, correo } = nuevoEmpleado;
    if (!nombre || !identificacion || !direccion || !correo) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return false;
    }
    return true;
  };


  const guardarEmpleado = () => {
    if (!validarFormulario()) return;

    axios.post(URL_API, nuevoEmpleado)
      .then(() => {
        Swal.fire('Éxito', 'Empleado agregado correctamente', 'success');
        setEmpleados([...empleados, nuevoEmpleado]);
        setMostrarModal(false);
        setNuevoEmpleado({ nombre: '', identificacion: '', direccion: '', correo: '' });
      })
      .catch(error => Swal.fire('Error', 'No se pudo agregar el empleado', 'error'));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Empleados</h1>
      <Button className="mb-3" variant="success" onClick={() => setMostrarModal(true)}>
        <i className="fas fa-user-plus"></i> Agregar Empleado
      </Button>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Dirección</th>
            <th>Correo Electrónico</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.nombre}</td>
              <td>{empleado.identificacion}</td>
              <td>{empleado.direccion}</td>
              <td>{empleado.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CampoEntrada
            etiqueta="Nombre"
            nombre="nombre"
            valor={nuevoEmpleado.nombre}
            onChange={manejarCambioEntrada}
          />
          <CampoEntrada
            etiqueta="Identificación"
            nombre="identificacion"
            valor={nuevoEmpleado.identificacion}
            onChange={manejarCambioEntrada}
          />
          <CampoEntrada
            etiqueta="Dirección"
            nombre="direccion"
            valor={nuevoEmpleado.direccion}
            onChange={manejarCambioEntrada}
          />
          <CampoEntrada
            etiqueta="Correo Electrónico"
            nombre="correo"
            valor={nuevoEmpleado.correo}
            onChange={manejarCambioEntrada}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarEmpleado}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Aplicacion;
