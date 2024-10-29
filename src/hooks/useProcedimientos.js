// hooks/useProcedimientos.js
import { useState, useCallback } from 'react';
import procedimientosService from '../services/procedimientosService';

export function useProcedimientos() {
  const [procedimientos, setProcedimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error in procedimiento operation:', err);
    setError(err.response?.data?.error || err.message || 'An unexpected error occurred');
    setLoading(false);
  }, []);

  const fetchProcedimientos = useCallback(async (budgetId) => {
    try {
      setLoading(true);
      const data = await procedimientosService.getProcedimientos(budgetId);
      setProcedimientos(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error al obtener procedimientos' };
    }
  }, [handleError]);

  const createProcedimiento = useCallback(async (budgetId, { nombreProcedimiento }) => {
    try {
      setLoading(true);
      const data = await procedimientosService.createProcedimiento(budgetId, { nombreProcedimiento });
      setProcedimientos(prevProcedimientos => [...prevProcedimientos, data]);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error al crear el procedimiento' };
    }
  }, [handleError]);

  const deleteProcedimiento = useCallback(async (budgetId, procedimientoId) => {
    try {
      setLoading(true);
      const { success, data, error } = await procedimientosService.deleteProcedimiento(budgetId, procedimientoId);
      if (success) {
        setProcedimientos(prevProcedimientos => 
          prevProcedimientos.filter(proc => proc._id !== procedimientoId)
        );
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        console.error('Error al eliminar el procedimiento:', error);
        throw new Error(error || 'Error desconocido al eliminar el procedimiento');
      }
    } catch (err) {
      handleError(err);
      return { success: false, error: err.message || 'Error al eliminar el procedimiento' };
    }
  }, [handleError]);

  return {
    procedimientos,
    loading,
    error,
    fetchProcedimientos,
    createProcedimiento,
    deleteProcedimiento
  };
}