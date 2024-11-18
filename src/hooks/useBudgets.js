import { useState, useCallback } from 'react';
import budgetService from '../services/budgetService';
import { toast } from 'react-toastify';

export function useBudgets() {
  const [budgets, setBudgets] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error en operación de presupuesto:', err);
    setError(err.response?.data?.error || err.message);
    setLoading(false);
  }, []);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await budgetService.getAllBudgets();
      setBudgets(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.message };
    }
  }, [handleError]);

  const fetchBudgetsByPatient = useCallback(async (patientId) => {
    try {
      setLoading(true);
      const data = await budgetService.getBudgetsByPatient(patientId);
      setBudgets(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.message };
    }
  }, [handleError]);

  const createBudget = useCallback(async (budgetData) => {
    try {
      setLoading(true);
      const data = await budgetService.createBudget(budgetData);
      setBudgets(prev => [...prev, data]);
      setLoading(false);
      toast.success('Presupuesto creado exitosamente');
      return { success: true, data };
    } catch (err) {
      handleError(err);
      toast.error('Error al crear el presupuesto');
      return { success: false, error: err.message };
    }
  }, [handleError]);

  const updateBudgetStatus = useCallback(async (budgetId, status) => {
    try {
      setLoading(true);
      const data = await budgetService.updateBudgetStatus(budgetId, status);
      setBudgets(prev => 
        prev.map(budget => budget.id === budgetId ? data : budget)
      );
      setLoading(false);
      toast.success('Estado del presupuesto actualizado');
      return { success: true, data };
    } catch (err) {
      handleError(err);
      toast.error('Error al actualizar el estado del presupuesto');
      return { success: false, error: err.message };
    }
  }, [handleError]);

  const calculateTotals = useCallback((fases) => {
    let totalGeneral = 0;
    const fasesCalculated = fases.map(fase => {
      let totalFase = 0;
      const procedimientosCalculated = fase.procedimientos.map(proc => {
        const costoTotal = proc.numeroPiezas * proc.costoPorUnidad;
        totalFase += costoTotal;
        return { ...proc, costoTotal };
      });
      totalGeneral += totalFase;
      return { ...fase, procedimientos: procedimientosCalculated, total: totalFase };
    });
    return { fases: fasesCalculated, totalGeneral };
  }, []);

  return {
    budgets,
    currentBudget,
    loading,
    error,
    fetchBudgets,
    fetchBudgetsByPatient,
    createBudget,
    updateBudgetStatus,
    setCurrentBudget,
    calculateTotals
  };
}