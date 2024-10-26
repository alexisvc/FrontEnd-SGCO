// hooks/useBudgetProcedimientos.js
import { useState, useCallback } from 'react';
import budgetProcedimientosService from '../services/budgetProcedimientosService';

export function useBudgetProcedimientos() {
  const [procedimientos, setProcedimientos] = useState([]);
  const [currentProcedimiento, setCurrentProcedimiento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error in procedimiento operation:', err);
    setError(err.response?.data?.error || err.message || 'An unexpected error occurred');
    setLoading(false);
  }, []);

  const fetchProcedimientosByBudget = useCallback(async (budgetId) => {
    try {
      setLoading(true);
      const data = await budgetProcedimientosService.getProcedimientosByBudget(budgetId);
      setProcedimientos(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching procedimientos' };
    }
  }, [handleError]);

  const createProcedimiento = useCallback(async (budgetId, nuevoProcedimiento) => {
    try {
      setLoading(true);
      const data = await budgetProcedimientosService.createProcedimiento(budgetId, nuevoProcedimiento);
      setProcedimientos(prev => [...prev, data]);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error creating procedimiento' };
    }
  }, [handleError]);

  const fetchProcedimientoById = useCallback(async (budgetId, procedimientoId) => {
    try {
      setLoading(true);
      const data = await budgetProcedimientosService.getProcedimientoById(budgetId, procedimientoId);
      setCurrentProcedimiento(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching procedimiento' };
    }
  }, [handleError]);

  const createFase = useCallback(async (budgetId, procedimientoId, nuevaFase) => {
    try {
      setLoading(true);
      const data = await budgetProcedimientosService.createFase(budgetId, procedimientoId, nuevaFase);
      setCurrentProcedimiento(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error creating fase' };
    }
  }, [handleError]);

  const deleteProcedimiento = useCallback(async (budgetId, procedimientoId) => {
    try {
      setLoading(true);
      await budgetProcedimientosService.deleteProcedimiento(budgetId, procedimientoId);
      setProcedimientos(prev => prev.filter(proc => proc.id !== procedimientoId));
      setLoading(false);
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error deleting procedimiento' };
    }
  }, [handleError]);

  return {
    procedimientos,
    currentProcedimiento,
    loading,
    error,
    fetchProcedimientosByBudget,
    createProcedimiento,
    fetchProcedimientoById,
    createFase,
    deleteProcedimiento,
    setCurrentProcedimiento
  };
}