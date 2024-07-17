// usePeriodonticTreatments.js
import { useEffect, useState } from 'react';
import periodonticTreatmentService from '../services/periodonticTreatmentService';

export function usePeriodonticTreatments() {
  const [periodonticTreatments, setPeriodonticTreatments] = useState([]);
  const [periodonticTreatment, setPeriodonticTreatment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    periodonticTreatmentService.getAllPeriodonticTreatments()
      .then(data => {
        setPeriodonticTreatments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchPeriodonticTreatmentById = (id) => {
    setLoading(true);
    periodonticTreatmentService.getPeriodonticTreatmentById(id)
      .then(data => {
        setPeriodonticTreatment(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchPeriodonticTreatmentsByPatientId = (patientId) => {
    setLoading(true);
    periodonticTreatmentService.getPeriodonticTreatmentsByPatientId(patientId)
      .then(data => {
        setPeriodonticTreatment(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const createPeriodonticTreatment = (newPeriodonticTreatment) => {
    setLoading(true);
    periodonticTreatmentService.createPeriodonticTreatment(newPeriodonticTreatment)
      .then(data => {
        setPeriodonticTreatments([...periodonticTreatments, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updatePeriodonticTreatment = (id, updatedPeriodonticTreatment) => {
    setLoading(true);
    periodonticTreatmentService.updatePeriodonticTreatment(id, updatedPeriodonticTreatment)
      .then(data => {
        setPeriodonticTreatments(periodonticTreatments.map(treatment => treatment.id === id ? data : treatment));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deletePeriodonticTreatment = (id) => {
    setLoading(true);
    periodonticTreatmentService.deletePeriodonticTreatment(id)
      .then(() => {
        setPeriodonticTreatments(periodonticTreatments.filter(treatment => treatment.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    periodonticTreatments,
    periodonticTreatment,
    loading,
    error,
    fetchPeriodonticTreatmentById,
    fetchPeriodonticTreatmentsByPatientId,
    createPeriodonticTreatment,
    updatePeriodonticTreatment,
    deletePeriodonticTreatment,
  };
}
