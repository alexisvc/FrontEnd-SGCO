import React from 'react';

const PatientForm = ({ newPatient, handleCreateChange, handleCreateSubmit }) => {
  return (
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
  );
};

export default PatientForm;
