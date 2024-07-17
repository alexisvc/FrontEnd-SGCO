import { useEffect, useState } from 'react';
import patientsService from '../services/patients';

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    patientsService.getAllPatients()
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchPatientById = (id) => {
    setLoading(true);
    patientsService.getPatientById(id)
      .then(data => {
        setPatient(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchPatientByCedula = (numeroCedula) => {
    setLoading(true);
    patientsService.getPatientByCedula(numeroCedula)
      .then(data => {
        setPatient(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const createPatient = async (newPatient) => {
    try {
      setLoading(true);
      const data = await patientsService.createPatient(newPatient);
      setPatients([...patients, data]);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error("Error al crear el pictograma:", err);
      throw err;  // Lanzar el error para que pueda ser capturado por el bloque catch en handleCreateSubmit
    }
  };
  

  const updatePatient = async (id, updatedPatient) => {
    try {
      setLoading(true);
      const data = await patientsService.updatePatient(id, updatedPatient);
      setPatients(patients.map(patient => patient.id === id ? data : patient));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err; // Lanzar el error para que pueda ser capturado por el bloque catch en el controlador correspondiente
    }
  };
  

  const deletePatient = (id) => {
    setLoading(true);
    patientsService.deletePatient(id)
      .then(() => {
        setPatients(patients.filter(patient => patient.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    patients,
    patient,
    loading,
    error,
    fetchPatientById,
    fetchPatientByCedula,
    createPatient,
    updatePatient,
    deletePatient,
    setPatient
  };
}
