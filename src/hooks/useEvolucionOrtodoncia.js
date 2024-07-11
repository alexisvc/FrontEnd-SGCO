import { useEffect, useState } from 'react';
import evolucionOrtodonciaService from '../services/evolucionOrtodonciaService';

export function useEvolucionOrtodoncia() {
  const [evoluciones, setEvoluciones] = useState([]);
  const [evolucion, setEvolucion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    evolucionOrtodonciaService.getAll()
      .then(data => {
        setEvoluciones(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchEvolucionById = (id) => {
    setLoading(true);
    evolucionOrtodonciaService.getById(id)
      .then(data => {
        setEvolucion(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchEvolucionesByOrtodonciaId = (ortodonciaId) => {
    setLoading(true);
    evolucionOrtodonciaService.getByOrtodonciaId(ortodonciaId)
      .then(data => {
        setEvoluciones(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        setEvoluciones([]);
      });
  };

  const createEvolucion = (newEvolucion) => {
    setLoading(true);
    evolucionOrtodonciaService.create(newEvolucion)
      .then(data => {
        setEvoluciones([...evoluciones, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updateEvolucion = (id, updatedEvolucion) => {
    setLoading(true);
    evolucionOrtodonciaService.update(id, updatedEvolucion)
      .then(data => {
        setEvoluciones(evoluciones.map(evolucion => evolucion.id === id ? data : evolucion));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deleteEvolucion = (id) => {
    setLoading(true);
    evolucionOrtodonciaService.remove(id)
      .then(() => {
        setEvoluciones(evoluciones.filter(evolucion => evolucion.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    evoluciones,
    evolucion,
    loading,
    error,
    fetchEvolucionById,
    fetchEvolucionesByOrtodonciaId,
    createEvolucion,
    updateEvolucion,
    deleteEvolucion
  };
}
