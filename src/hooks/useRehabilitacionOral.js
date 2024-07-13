import { useEffect, useState } from 'react';
import rehabilitacionOralService from '../services/rehabilitacionOralService';

export function useRehabilitacionOral() {
  const [rehabilitacionOralList, setRehabilitacionOralList] = useState([]);
  const [rehabilitacionOral, setRehabilitacionOral] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    rehabilitacionOralService.getAllRehabilitacionOral()
      .then(data => {
        setRehabilitacionOralList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchRehabilitacionOralById = (id) => {
    setLoading(true);
    rehabilitacionOralService.getRehabilitacionOralById(id)
      .then(data => {
        setRehabilitacionOral(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchRehabilitacionOralByPatientId = (patientId) => {
    setLoading(true);
    rehabilitacionOralService.getRehabilitacionOralByPatientId(patientId)
      .then(data => {
        setRehabilitacionOralList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const createRehabilitacionOral = (newRehabilitacionOral) => {
    setLoading(true);
    rehabilitacionOralService.createRehabilitacionOral(newRehabilitacionOral)
      .then(data => {
        setRehabilitacionOralList([...rehabilitacionOralList, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updateRehabilitacionOral = (id, updatedRehabilitacionOral) => {
    setLoading(true);
    rehabilitacionOralService.updateRehabilitacionOral(id, updatedRehabilitacionOral)
      .then(data => {
        setRehabilitacionOralList(rehabilitacionOralList.map(item => item.id === id ? data : item));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deleteRehabilitacionOral = (id) => {
    setLoading(true);
    rehabilitacionOralService.deleteRehabilitacionOral(id)
      .then(() => {
        setRehabilitacionOralList(rehabilitacionOralList.filter(item => item.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    rehabilitacionOralList,
    rehabilitacionOral,
    loading,
    error,
    fetchRehabilitacionOralById,
    fetchRehabilitacionOralByPatientId,
    createRehabilitacionOral,
    updateRehabilitacionOral,
    deleteRehabilitacionOral,
  };
}
