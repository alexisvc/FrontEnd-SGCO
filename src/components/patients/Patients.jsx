import React, { useState } from 'react';
import { usePatients } from '../../hooks/usePatients';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Patients = ({ user }) => {
  const navigate = useNavigate();
  const { patients, patient, loading, error, fetchPatientById, fetchPatientByCedula, createPatient } = usePatients();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchCedula, setSearchCedula] = useState('');
  const [newPatient, setNewPatient] = useState({
    nombrePaciente: '',
    edadPaciente: '',
    fechaNacimiento: '',
    correoPaciente: '',
    direccionPaciente: '',
    generoPaciente: '',
    numeroCedula: '',
    ocupacion: '',
    telefono: '',
    telContactoEmergencia: '',
    afinidadContactoEmergencia: ''
  });

  const handleSearchIdChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchCedulaChange = (e) => {
    setSearchCedula(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId) {
      fetchPatientById(searchId);
    } else if (searchCedula) {
      fetchPatientByCedula(searchCedula);
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createPatient(newPatient);
    setNewPatient({
      nombrePaciente: '',
      edadPaciente: '',
      fechaNacimiento: '',
      correoPaciente: '',
      direccionPaciente: '',
      generoPaciente: '',
      numeroCedula: '',
      ocupacion: '',
      telefono: '',
      telContactoEmergencia: '',
      afinidadContactoEmergencia: ''
    });
    setShowCreateForm(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate("/main-menu");
        }}
      >
        <FaArrowCircleLeft />
        <span>Atrás</span>
      </button>
      <h1>Pacientes</h1>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Ocultar Crear Paciente' : 'Crear Paciente'}
      </button>
      <button onClick={() => setShowSearchForm(!showSearchForm)}>
        {showSearchForm ? 'Ocultar Buscar Paciente' : 'Buscar Paciente'}
      </button>
      {showCreateForm && (
        <div>
          <h3>Crear Paciente</h3>
          <form onSubmit={handleCreateSubmit}>
            <input
              type="text"
              name="nombrePaciente"
              value={newPatient.nombrePaciente}
              onChange={handleCreateChange}
              placeholder="Nombre"
            />
            <input
              type="number"
              name="edadPaciente"
              value={newPatient.edadPaciente}
              onChange={handleCreateChange}
              placeholder="Edad"
            />
            <input
              type="date"
              name="fechaNacimiento"
              value={newPatient.fechaNacimiento}
              onChange={handleCreateChange}
              placeholder="Fecha de Nacimiento"
            />
            <input
              type="email"
              name="correoPaciente"
              value={newPatient.correoPaciente}
              onChange={handleCreateChange}
              placeholder="Correo"
            />
            <input
              type="text"
              name="direccionPaciente"
              value={newPatient.direccionPaciente}
              onChange={handleCreateChange}
              placeholder="Dirección"
            />
            <input
              type="text"
              name="generoPaciente"
              value={newPatient.generoPaciente}
              onChange={handleCreateChange}
              placeholder="Género"
            />
            <input
              type="text"
              name="numeroCedula"
              value={newPatient.numeroCedula}
              onChange={handleCreateChange}
              placeholder="Número de Cédula"
            />
            <input
              type="text"
              name="ocupacion"
              value={newPatient.ocupacion}
              onChange={handleCreateChange}
              placeholder="Ocupación"
            />
            <input
              type="text"
              name="telefono"
              value={newPatient.telefono}
              onChange={handleCreateChange}
              placeholder="Teléfono"
            />
            <input
              type="text"
              name="telContactoEmergencia"
              value={newPatient.telContactoEmergencia}
              onChange={handleCreateChange}
              placeholder="Teléfono de Contacto de Emergencia"
            />
            <input
              type="text"
              name="afinidadContactoEmergencia"
              value={newPatient.afinidadContactoEmergencia}
              onChange={handleCreateChange}
              placeholder="Afinidad de Contacto de Emergencia"
            />
            <button type="submit">Crear</button>
          </form>
        </div>
      )}
      {showSearchForm && (
        <div>
          <h3>Buscar Paciente</h3>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchId}
              onChange={handleSearchIdChange}
              placeholder="Ingrese ID del paciente"
            />
            <input
              type="text"
              value={searchCedula}
              onChange={handleSearchCedulaChange}
              placeholder="Ingrese Número de Cédula del paciente"
            />
            <button type="submit">Buscar</button>
          </form>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {patient && (
            <div>
              <h3>Detalles del Paciente</h3>
              <p>Nombre: {patient.nombrePaciente}</p>
              <p>Edad: {patient.edadPaciente}</p>
              <p>Fecha de Nacimiento: {patient.fechaNacimiento}</p>
              <p>Correo: {patient.correoPaciente}</p>
              <p>Dirección: {patient.direccionPaciente}</p>
              <p>Género: {patient.generoPaciente}</p>
              <p>Número de Cédula: {patient.numeroCedula}</p>
              <p>Ocupación: {patient.ocupacion}</p>
              <p>Teléfono: {patient.telefono}</p>
              <p>Teléfono de Contacto de Emergencia: {patient.telContactoEmergencia}</p>
              <p>Afinidad de Contacto de Emergencia: {patient.afinidadContactoEmergencia}</p>
            </div>
          )}
        </div>
      )}
      <div>
        <h3>Lista de Pacientes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Fecha de Nacimiento</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Género</th>
              <th>Número de Cédula</th>
              <th>Ocupación</th>
              <th>Teléfono</th>
              <th>Tel. Emergencia</th>
              <th>Afinidad Emergencia</th>
              <th>Historia Clínica</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.nombrePaciente}</td>
                <td>{patient.edadPaciente}</td>
                <td>{patient.fechaNacimiento}</td>
                <td>{patient.correoPaciente}</td>
                <td>{patient.direccionPaciente}</td>
                <td>{patient.generoPaciente}</td>
                <td>{patient.numeroCedula}</td>
                <td>{patient.ocupacion}</td>
                <td>{patient.telefono}</td>
                <td>{patient.telContactoEmergencia}</td>
                <td>{patient.afinidadContactoEmergencia}</td>
                <td><Link to={`/prueba/${patient.id}`}>Ver HC</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
