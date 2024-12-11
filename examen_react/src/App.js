import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import CampoEntrada from './components/CampoEntrada';

const URL_API = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

function Aplicacion() {
  const [empleados, setEmpleados] = useState(); 
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', dni: '', direccion: '', correo: '' }); 
  useEffect(() => {
    axios.get(URL_API)
      .then(response => setEmpleados(response.data))
      .catch(error => console.error('Error al obtener empleados:', error));
  }, []);

  
  const manejarCambioEntrada = (e) => {
    const { nombre, valor } = e.target; 
    setNuevoEmpleado({ ...nuevoEmpleado, [nombre]: valor }); 

 
  const validarFormulario = () => {
    const { nombre, dni, direccion, correo } = nuevoEmpleado; 
    if (!nombre || !dni || !direccion || !correo) {
      alert('Todos los campos son obligatorios'); 
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
        setNuevoEmpleado({ nombre: '', dni: '', direccion: '', correo: '' });
      })
      .catch(error => console.error('Error:', error)); 
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Empleados</h1>
      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Agregar Empleado
      </Button>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Dirección</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
            <tr key={index}> {}
              <td>{empleado.name}</td> {}
              <td>{empleado.dni}</td>
              <td>{empleado.direccion}</td>
              <td>{empleado.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header>
          <Modal.Title>Agregar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CampoEntrada etiqueta="Nombre" nombre="nombre" valor={nuevoEmpleado.nombre} onChange={manejarCambioEntrada} />
          <CampoEntrada etiqueta="DNI" nombre="dni" valor={nuevoEmpleado.dni} onChange={manejarCambioEntrada} />
          <CampoEntrada etiqueta="Dirección" nombre="direccion" valor={nuevoEmpleado.direccion} onChange={manejarCambioEntrada} />
          <CampoEntrada etiqueta="Correo" nombre="correo" valor={nuevoEmpleado.correo} onChange={manejarCambioEntrada} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cerrar</Button>
          <Button onClick={guardarEmpleado}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Aplicacion;
