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
    return { success: false, error: err.message };
  }, []);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await budgetService.getAllBudgets();
      setBudgets(data);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
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
      return handleError(err);
    }
  }, [handleError]);


  // useBudgets.js
  const fetchBudgetById = useCallback(async (budgetId) => {
    console.log('Hook - Starting fetchBudgetById:', budgetId);
    try {
      setLoading(true);
      setError(null);
      
      if (!budgetId) {
        throw new Error('ID de presupuesto no proporcionado');
      }
  
      const response = await budgetService.getBudgetById(budgetId);
      console.log('Hook - Response from service:', response);
      setCurrentBudget(response);

      // Validar la respuesta
      if (!response || !response._id) {
        throw new Error('Datos del presupuesto inválidos');
      }
  
      setCurrentBudget(response);
      setLoading(false);
  
      return {
        success: true,
        data: response
      };
    } catch (err) {
      console.error('Hook - Error in fetchBudgetById:', err);
      setError(err.message || 'Error al cargar el presupuesto');
      setLoading(false);
      
      return {
        success: false,
        error: err.message || 'Error al cargar el presupuesto'
      };
    }
  }, []);

  const createBudget = useCallback(async (budgetData) => {
    try {
      setLoading(true);
      const data = await budgetService.createBudget(budgetData);
      setBudgets(prev => [...prev, data]);
      setLoading(false);
      toast.success('Presupuesto creado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al crear el presupuesto');
      return handleError(err);
    }
  }, [handleError]);


  const createBudgetForTreatment = useCallback(async (treatmentId, budgetData) => {
    try {
      setLoading(true);
      const data = await budgetService.createBudgetForTreatment(treatmentId, budgetData);
      setBudgets(prev => [...prev, data]);
      setLoading(false);
      return { success: true, data };
    } catch (err) {
      return handleError(err);
    }
  }, [handleError]);

  const updateBudget = useCallback(async (budgetId, budgetData) => {
    try {
      setLoading(true);
      const data = await budgetService.updateBudget(budgetId, budgetData);
      setBudgets(prev => prev.map(budget => 
        budget._id === budgetId ? data : budget
      ));
      setLoading(false);
      toast.success('Presupuesto actualizado exitosamente');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al actualizar el presupuesto');
      return handleError(err);
    }
  }, [handleError]);

  /*
  const updateBudgetStatus = useCallback(async (budgetId, status) => {
    try {
      setLoading(true);
      const data = await budgetService.updateBudgetStatus(budgetId, status);
      setBudgets(prev => prev.map(budget => 
        budget._id === budgetId ? data : budget
      ));
      setLoading(false);
      toast.success('Estado del presupuesto actualizado');
      return { success: true, data };
    } catch (err) {
      toast.error('Error al actualizar el estado del presupuesto');
      return handleError(err);
    }
  }, [handleError]);
  */

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

  // Agregar nueva función para crear presupuesto desde planificación
  const createBudgetFromTreatment = async (treatmentId) => {
    const treatment = await patientTreatmentService.getById(treatmentId);
    
    const budgetData = {
      paciente: treatment.paciente._id,
      especialidad: treatment.especialidad,
      treatmentPlan: treatmentId,
      fases: treatment.actividades.map((act, index) => ({
        nombre: `Fase ${index + 1}`,
        descripcion: act.actividadPlanTrat,
        procedimientos: [{
          nombre: act.actividadPlanTrat,
          numeroPiezas: 1,
          costoPorUnidad: act.montoAbono,
          estado: act.estado
        }]
      }))
    };
  
    return await createBudget(budgetData);
  };

  return {
    budgets,
    currentBudget,
    loading,
    error,
    fetchBudgets,
    fetchBudgetsByPatient,
    fetchBudgetById,
    createBudget,
    createBudgetForTreatment,
    createBudgetFromTreatment,
    updateBudget,
    //updateBudgetStatus,
    calculateTotals,
    setCurrentBudget
  };
}