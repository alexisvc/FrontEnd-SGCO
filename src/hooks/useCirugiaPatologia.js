import { useEffect, useState } from 'react';
import cirugiaPatologiaService from '../services/cirugiaPatologiaService';

export function useCirugiaPatologia() {
  const [cirugiaPatologias, setCirugiaPatologias] = useState([]);
  const [cirugiaPatologia, setCirugiaPatologia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    cirugiaPatologiaService.getAllCirugiaPatologias()
      .then(data => {
        setCirugiaPatologias(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchCirugiaPatologiaById = (id) => {
    setLoading(true);
    cirugiaPatologiaService.getCirugiaPatologiaById(id)
      .then(data => {
        setCirugiaPatologia(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchCirugiaPatologiaByPatientId = (patientId) => {
    setLoading(true);
    cirugiaPatologiaService.getCirugiaPatologiaByPatientId(patientId)
      .then(data => {
        setCirugiaPatologia(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        setCirugiaPatologia(null);
      });
  };

  const createCirugiaPatologia = (newCirugiaPatologia) => {
    setLoading(true);
    cirugiaPatologiaService.createCirugiaPatologia(newCirugiaPatologia)
      .then(data => {
        setCirugiaPatologias([...cirugiaPatologias, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updateCirugiaPatologia = (id, updatedCirugiaPatologia) => {
    setLoading(true);
    cirugiaPatologiaService.updateCirugiaPatologia(id, updatedCirugiaPatologia)
      .then(data => {
        setCirugiaPatologias(cirugiaPatologias.map(cirugia => cirugia.id === id ? data : cirugia));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deleteCirugiaPatologia = (id) => {
    setLoading(true);
    cirugiaPatologiaService.deleteCirugiaPatologia(id)
      .then(() => {
        setCirugiaPatologias(cirugiaPatologias.filter(cirugia => cirugia.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    cirugiaPatologias,
    cirugiaPatologia,
    loading,
    error,
    fetchCirugiaPatologiaById,
    fetchCirugiaPatologiaByPatientId,
    createCirugiaPatologia,
    updateCirugiaPatologia,
    deleteCirugiaPatologia,
  };
}
