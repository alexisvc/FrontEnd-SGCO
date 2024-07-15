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

  const createPatient = (newPatient) => {
    setLoading(true);
    patientsService.createPatient(newPatient)
      .then(data => {
        setPatients([...patients, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updatePatient = (id, updatedPatient) => {
    setLoading(true);
    patientsService.updatePatient(id, updatedPatient)
      .then(data => {
        setPatients(patients.map(patient => patient.id === id ? data : patient));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
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
