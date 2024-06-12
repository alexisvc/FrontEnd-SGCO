import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { usePatients } from '../../hooks/usePatients';

const PatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updatePatient } = usePatients();
  const { patient } = location.state;

  const [editablePatient, setEditablePatient] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditablePatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient(patient.id, editablePatient);
    navigate('/patients');
  };

  return (
    <div>
      <h3>Detalles del Paciente</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombrePaciente"
          value={editablePatient.nombrePaciente}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          type="number"
          name="edadPaciente"
          value={editablePatient.edadPaciente}
          onChange={handleChange}
          placeholder="Edad"
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={editablePatient.fechaNacimiento.split('T')[0]}
          onChange={handleChange}
          placeholder="Fecha de Nacimiento"
        />
        <input
          type="email"
          name="correoPaciente"
          value={editablePatient.correoPaciente}
          onChange={handleChange}
          placeholder="Correo"
        />
        <input
          type="text"
          name="direccionPaciente"
          value={editablePatient.direccionPaciente}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <input
          type="text"
          name="generoPaciente"
          value={editablePatient.generoPaciente}
          onChange={handleChange}
          placeholder="Género"
        />
        <input
          type="text"
          name="numeroCedula"
          value={editablePatient.numeroCedula}
          onChange={handleChange}
          placeholder="Número de Cédula"
        />
        <input
          type="text"
          name="ocupacion"
          value={editablePatient.ocupacion}
          onChange={handleChange}
          placeholder="Ocupación"
        />
        <input
          type="text"
          name="telefono"
          value={editablePatient.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <input
          type="text"
          name="telContactoEmergencia"
          value={editablePatient.telContactoEmergencia}
          onChange={handleChange}
          placeholder="Teléfono de Contacto de Emergencia"
        />
        <input
          type="text"
          name="afinidadContactoEmergencia"
          value={editablePatient.afinidadContactoEmergencia}
          onChange={handleChange}
          placeholder="Afinidad de Contacto de Emergencia"
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default PatientDetails;
