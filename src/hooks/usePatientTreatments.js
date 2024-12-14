import { useState } from 'react';
import patientTreatmentService from '../services/patientTreatmentService';
import { toast } from 'react-toastify';

export function  usePatientTreatments  ()  {
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
/*
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
*/
/*
  const createPatientTreatment = async (treatmentData) => {
    try {
      setLoading(true);
      //const treatment = await patientTreatmentService.create(treatmentData);
      const treatment = {
        paciente: treatmentData.paciente,
        especialidad: treatmentData.especialidad,
        actividades: [{
          cita: treatmentData.cita,
          actividadPlanTrat: treatmentData.actividadPlanTrat,
          fechaPlanTrat: treatmentData.fechaPlanTrat,
          montoAbono: treatmentData.montoAbono
        }]
      };

      const data = await patientTreatmentService.create(treatment);

      setPatientTreatments(prev => [...prev, data]);
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
*/
const createPatientTreatment = async (treatmentData) => {
  try {
    console.log('Datos recibidos en hook:', treatmentData);
    const data = await patientTreatmentService.create(treatmentData);
    setPatientTreatments(prev => [...prev, data]);
    toast.success('Planificación creada exitosamente');
    return data;
  } catch (error) {
    console.error('Error en hook:', error);
    throw error;
  }
};

  // Agregar nuevas actividades
  const addActivity = async (treatmentId, activityData) => {
    try {
      setLoading(true);
      const updatedTreatment = await patientTreatmentService.addActivity(treatmentId, activityData);
      setPatientTreatments(prevTreatments => 
        prevTreatments.map(t => t.id === treatmentId ? updatedTreatment : t)
      );
      setLoading(false);
      toast.success('Actividad agregada exitosamente');
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al agregar actividad');
    }
  };

/*
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
  */

  const updatePatientTreatment = async (id, treatmentData) => {
    try {
      setLoading(true);
      const updatedTreatment = await patientTreatmentService.update(id, treatmentData);
      setPatientTreatments(prev => 
        prev.map(treatment => treatment.id === id ? updatedTreatment : treatment)
      );
      setLoading(false);
      toast.success('Planificación actualizada exitosamente');
      return updatedTreatment;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error('Error al actualizar la planificación');
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
    addActivity,
    updatePatientTreatment,
    deletePatientTreatment
  };
};

export default usePatientTreatments;