import React, { useState } from 'react';
import { usePatients } from '../../hooks/usePatients';
import { Link } from 'react-router-dom';

const Patients = ({ user }) => {
  const { patients, patient, loading, error, fetchPatientById, createPatient } = usePatients();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPatientById(searchId);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createPatient(newPatient);
    setNewPatient({ name: '', age: '', gender: '' });
  };

  return (
    <div>
      <h1>Patients</h1>
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
              name="name"
              value={newPatient.name}
              onChange={handleCreateChange}
              placeholder="Name"
            />
            <input
              type="number"
              name="age"
              value={newPatient.age}
              onChange={handleCreateChange}
              placeholder="Age"
            />
            <input
              type="text"
              name="gender"
              value={newPatient.gender}
              onChange={handleCreateChange}
              placeholder="Gender"
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
              onChange={handleSearchChange}
              placeholder="Enter patient ID"
            />
            <button type="submit">Buscar</button>
          </form>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {patient && (
            <div>
              <h3>Patient Details</h3>
              <p>Name: {patient.name}</p>
              <p>Age: {patient.age}</p>
              <p>Gender: {patient.gender}</p>
            </div>
          )}
        </div>
      )}
      <div>
        <h3>Lista de Pacientes</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Historia Clínica</th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td><Link to={`/medicalRecords/${patient.id}`}>{patient.id}</Link></td> {/* Enlace a la historia clínica */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
