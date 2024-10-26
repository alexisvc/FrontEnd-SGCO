// hooks/useBudgets.js
import { useState, useCallback } from 'react';
import budgetService from '../services/budgetService';

export function useBudgets() {
  const [budgets, setBudgets] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    console.error('Error in budget operation:', err);
    setError(err.response?.data?.error || err.message || 'An unexpected error occurred');
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
      return { success: false, error: err.response?.data?.error || 'Error fetching budgets' };
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
      return { success: false, error: err.response?.data?.error || 'Error fetching patient budgets' };
    }
  }, [handleError]);

  const fetchBudgetById = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await budgetService.getBudgetById(id);
      setCurrentBudget(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error fetching budget' };
    }
  }, [handleError]);

  const createBudget = useCallback(async (newBudget) => {
    try {
      setLoading(true);
      const data = await budgetService.createBudget(newBudget);
      setBudgets(prev => [...prev, data]);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error creating budget' };
    }
  }, [handleError]);

  const deleteBudget = useCallback(async (id) => {
    try {
      setLoading(true);
      await budgetService.deleteBudget(id);
      setBudgets(prev => prev.filter(budget => budget.id !== id));
      setLoading(false);
      return { success: true };
    } catch (err) {
      handleError(err);
      return { success: false, error: err.response?.data?.error || 'Error deleting budget' };
    }
  }, [handleError]);

  return {
    budgets,
    currentBudget,
    loading,
    error,
    fetchBudgets,
    fetchBudgetsByPatient,
    fetchBudgetById,
    createBudget,
    deleteBudget,
    setCurrentBudget
  };
}