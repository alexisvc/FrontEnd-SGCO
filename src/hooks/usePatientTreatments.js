import { useState } from 'react';
import patientTreatmentService from '../services/patientTreatmentService';
import { toast } from 'react-toastify';

const usePatientTreatments = () => {
  const [patientTreatments, setPatientTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllPatientTreatments = async () => {
    try {
      setLoading(true);
      const data = await patientTreatmentService.getAll();
      setPatientTreatments(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al obtener los tratamientos');
    }
  };

  const getPatientTreatmentsByPatientId = async (id) => {
    try {
      setLoading(true);
      const data = await patientTreatmentService.getByPatientId(id);
      setPatientTreatments(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al obtener los tratamientos del paciente');
    }
  };

  const createPatientTreatment = async (treatmentData) => {
    try {
      setLoading(true);
      const data = await patientTreatmentService.create(treatmentData);
      setPatientTreatments(prevTreatments => [...prevTreatments, data]);
      setLoading(false);
      toast.success('Tratamiento creado exitosamente');
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al crear el tratamiento');
      throw error;
    }
  };

  const updatePatientTreatment = async (id, treatmentData) => {
    try {
      setLoading(true);
      const updatedTreatment = await patientTreatmentService.update(id, treatmentData);
      setPatientTreatments(prevTreatments => 
        prevTreatments.map(treatment => 
          treatment.id === id ? updatedTreatment : treatment
        )
      );
      setLoading(false);
      toast.success('Tratamiento actualizado exitosamente');
      return updatedTreatment;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al actualizar el tratamiento');
      throw error;
    }
  };

  const deletePatientTreatment = async (id) => {
    try {
      setLoading(true);
      await patientTreatmentService.remove(id);
      setPatientTreatments(prevTreatments => 
        prevTreatments.filter(treatment => treatment.id !== id)
      );
      setLoading(false);
      toast.success('Tratamiento eliminado exitosamente');
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al eliminar el tratamiento');
    }
  };

  return {
    patientTreatments,
    loading,
    error,
    getAllPatientTreatments,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    updatePatientTreatment,
    deletePatientTreatment
  };
};

export default usePatientTreatments;