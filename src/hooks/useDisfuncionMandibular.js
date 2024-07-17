import { useEffect, useState } from 'react';
import disfuncionMandibularService from '../services/disfuncionMandibularService';

export function useDisfuncionMandibular() {
  const [disfuncionMandibularList, setDisfuncionMandibularList] = useState([]);
  const [disfuncionMandibular, setDisfuncionMandibular] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    disfuncionMandibularService.getAllDisfuncionMandibular()
      .then(data => {
        setDisfuncionMandibularList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchDisfuncionMandibularById = (id) => {
    setLoading(true);
    disfuncionMandibularService.getDisfuncionMandibularById(id)
      .then(data => {
        setDisfuncionMandibular(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchDisfuncionMandibularByPatientId = (patientId) => {
    setLoading(true);
    disfuncionMandibularService.getDisfuncionMandibularByPatientId(patientId)
      .then(data => {
        setDisfuncionMandibular(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const createDisfuncionMandibular = (newDisfuncionMandibular) => {
    setLoading(true);
    disfuncionMandibularService.createDisfuncionMandibular(newDisfuncionMandibular)
      .then(data => {
        setDisfuncionMandibularList([...disfuncionMandibularList, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updateDisfuncionMandibular = (id, updatedDisfuncionMandibular) => {
    setLoading(true);
    disfuncionMandibularService.updateDisfuncionMandibular(id, updatedDisfuncionMandibular)
      .then(data => {
        setDisfuncionMandibularList(disfuncionMandibularList.map(item => item.id === id ? data : item));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deleteDisfuncionMandibular = (id) => {
    setLoading(true);
    disfuncionMandibularService.deleteDisfuncionMandibular(id)
      .then(() => {
        setDisfuncionMandibularList(disfuncionMandibularList.filter(item => item.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    disfuncionMandibularList,
    disfuncionMandibular,
    loading,
    error,
    fetchDisfuncionMandibularById,
    fetchDisfuncionMandibularByPatientId,
    createDisfuncionMandibular,
    updateDisfuncionMandibular,
    deleteDisfuncionMandibular,
  };
}
