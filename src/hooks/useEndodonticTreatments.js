// endodonticTreatmentService.js
import { useEffect, useState } from 'react';
import endodonticTreatmentService from '../services/endodonticTreatmentService';

export function useEndodonticTreatments() {
  const [endodonticTreatments, setEndodonticTreatments] = useState([]);
  const [endodonticTreatment, setEndodonticTreatment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    endodonticTreatmentService.getAllEndodonticTreatments()
      .then(data => {
        setEndodonticTreatments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchEndodonticTreatmentById = (id) => {
    setLoading(true);
    endodonticTreatmentService.getEndodonticTreatmentById(id)
      .then(data => {
        setEndodonticTreatment(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchEndodonticTreatmentsByPatientId = (patientId) => {
    setLoading(true);
    endodonticTreatmentService.getEndodonticTreatmentsByPatientId(patientId)
      .then(data => {
        setEndodonticTreatments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const createEndodonticTreatment = (newEndodonticTreatment) => {
    setLoading(true);
    endodonticTreatmentService.createEndodonticTreatment(newEndodonticTreatment)
      .then(data => {
        setEndodonticTreatments([...endodonticTreatments, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updateEndodonticTreatment = (id, updatedEndodonticTreatment) => {
    setLoading(true);
    endodonticTreatmentService.updateEndodonticTreatment(id, updatedEndodonticTreatment)
      .then(data => {
        setEndodonticTreatments(endodonticTreatments.map(treatment => treatment.id === id ? data : treatment));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deleteEndodonticTreatment = (id) => {
    setLoading(true);
    endodonticTreatmentService.deleteEndodonticTreatment(id)
      .then(() => {
        setEndodonticTreatments(endodonticTreatments.filter(treatment => treatment.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    endodonticTreatments,
    endodonticTreatment,
    loading,
    error,
    fetchEndodonticTreatmentById,
    fetchEndodonticTreatmentsByPatientId,
    createEndodonticTreatment,
    updateEndodonticTreatment,
    deleteEndodonticTreatment,
  };
}
