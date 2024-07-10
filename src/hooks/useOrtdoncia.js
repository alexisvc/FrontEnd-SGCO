import { useEffect, useState } from 'react';
import ortodonciaService from '../services/ortodonciaService';

export function useOrtodoncia() {
  const [ortodoncias, setOrtodoncias] = useState([]);
  const [ortodoncia, setOrtodoncia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    ortodonciaService.getAllOrtodoncias()
      .then(data => {
        setOrtodoncias(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchOrtodonciaById = (id) => {
    setLoading(true);
    ortodonciaService.getOrtodonciaById(id)
      .then(data => {
        setOrtodoncia(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchOrtodonciasByPatientId = (patientId) => {
    setLoading(true);
    ortodonciaService.getOrtodonciasByPatientId(patientId)
      .then(data => {
        //setOrtodoncias(data);
        setOrtodoncia(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        //setOrtodoncias([]);
        setOrtodoncia(null);
      });
  };

  const createOrtodoncia = (newOrtodoncia) => {
    setLoading(true);
    ortodonciaService.createOrtodoncia(newOrtodoncia)
      .then(data => {
        setOrtodoncias([...ortodoncias, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updateOrtodoncia = (id, updatedOrtodoncia) => {
    setLoading(true);
    ortodonciaService.updateOrtodoncia(id, updatedOrtodoncia)
      .then(data => {
        setOrtodoncias(ortodoncias.map(ortodoncia => ortodoncia.id === id ? data : ortodoncia));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deleteOrtodoncia = (id) => {
    setLoading(true);
    ortodonciaService.deleteOrtodoncia(id)
      .then(() => {
        setOrtodoncias(ortodoncias.filter(ortodoncia => ortodoncia.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    ortodoncias,
    ortodoncia,
    loading,
    error,
    fetchOrtodonciaById,
    fetchOrtodonciasByPatientId,
    createOrtodoncia,
    updateOrtodoncia,
    deleteOrtodoncia,
  };
}
