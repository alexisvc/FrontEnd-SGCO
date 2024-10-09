import { useEffect, useState } from 'react';
import patientTreatmentService from '../services/patientTreatmentService';

const usePatientTreatments = () => {
  const [patientTreatments, setPatientTreatments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    patientTreatmentService.getAll()
      .then(data => {
        setPatientTreatments(data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  const getAllPatientTreatments = async () => {
    try {
      const data = await patientTreatmentService.getAll();
      setPatientTreatments(data);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error fetching patient treatments');
    }
  };

  const getPatientTreatmentsByPatientId = async (id) => {
    try {
      const data = await patientTreatmentService.getByPatientId(id);
      setPatientTreatments(data);
      console.log("Tratamientos del paciente", data);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error fetching patient treatments');
    }
  };

  const createPatientTreatment = async (newTreatment) => {
    try {
      const data = await patientTreatmentService.create(newTreatment);
      setPatientTreatments([...patientTreatments, data]);
      return data;
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error creating patient treatment');
      console.error("Error al crear el tratamiento del paciente:", error);
      throw error; // Lanzar el error para que pueda ser capturado por el bloque catch en el controlador correspondiente
    }
  };
  

  const updatePatientTreatment = async (id, updatedTreatment) => {
    try {
      const data = await patientTreatmentService.update(id, updatedTreatment);
      setPatientTreatments(patientTreatments.map(treatment => treatment.id === id ? data : treatment));
      return data;
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error updating patient treatment');
      console.error("Error al actualizar el tratamiento del paciente:", error);
      throw error; // Lanzar el error para que pueda ser capturado por el bloque catch en el controlador correspondiente
    }
  };
  

  const deletePatientTreatment = async (id) => {
    try {
      await patientTreatmentService.remove(id);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error deleting patient treatment');
    }
  };

  return {
    patientTreatments,
    error,
    getAllPatientTreatments,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    updatePatientTreatment,
    deletePatientTreatment
  };
};

export default usePatientTreatments;
