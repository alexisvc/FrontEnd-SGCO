// hooks/useFases.js
import { useState, useCallback } from 'react';
import fasesService from '../services/fasesService';

export function useFases() {
  const [fases, setFases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error in fase operation:', err);
    setError(err.response?.data?.error || err.message || 'An unexpected error occurred');
    setLoading(false);
  }, []);

  const fetchFases = useCallback(async (budgetId, procedimientoId) => {
    try {
      setLoading(true);
      const data = await fasesService.getFases(budgetId, procedimientoId);
      setFases(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error al obtener fases' };
    }
  }, [handleError]);

  const createFase = useCallback(async (budgetId, procedimientoId, fase) => {
    try {
      setLoading(true);
      const data = await fasesService.createFase(budgetId, procedimientoId, fase);
      setFases(prevFases => [...prevFases, data]);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error al crear la fase' };
    }
  }, [handleError]);

  const updateFase = useCallback(async (budgetId, procedimientoId, faseId, fase) => {
    try {
      setLoading(true);
      const data = await fasesService.updateFase(budgetId, procedimientoId, faseId, fase);
      setFases(prevFases => prevFases.map(f => f.id === faseId ? data : f));
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error al actualizar la fase' };
    }
  }, [handleError]);

  const deleteFase = useCallback(async (budgetId, procedimientoId, faseId) => {
    try {
      setLoading(true);
      await fasesService.deleteFase(budgetId, procedimientoId, faseId);
      setFases(prevFases => prevFases.filter(f => f.id !== faseId));
      setLoading(false);
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error al eliminar la fase' };
    }
  }, [handleError]);

  return {
    fases,
    loading,
    error,
    fetchFases,
    createFase,
    updateFase,
    deleteFase
  };
}