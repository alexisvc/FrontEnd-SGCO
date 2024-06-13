import { useState } from 'react';
import evolutionChartService from '../services/evolutionChartService';

const useEvolutionCharts = () => {
  const [evolutionCharts, setEvolutionCharts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvolutionCharts = async () => {
    setLoading(true);
    try {
      const data = await evolutionChartService.getAllEvolutionCharts();
      setEvolutionCharts(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchEvolutionChartById = async (evolutionChartId) => {
    setLoading(true);
    try {
      const data = await evolutionChartService.getEvolutionChartById(evolutionChartId);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error; // Propagate the error to the caller
    }
  };

  const fetchEvolutionChartsByPatientId = async (patientId) => {
    setLoading(true);
    try {
      const data = await evolutionChartService.getEvolutionChartsByPatientId(patientId);
      setEvolutionCharts(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const createEvolutionChart = async (evolutionChart) => {
    try {
      const data = await evolutionChartService.createEvolutionChart(evolutionChart);
      setEvolutionCharts([...evolutionCharts, data]);
    } catch (error) {
      throw error; // Propagate the error to the caller
    }
  };

  const updateEvolutionChart = async (evolutionChartId, evolutionChart) => {
    try {
      const data = await evolutionChartService.updateEvolutionChart(evolutionChartId, evolutionChart);
      setEvolutionCharts(evolutionCharts.map(chart => (chart.id === evolutionChartId ? data : chart)));
    } catch (error) {
      throw error; // Propagate the error to the caller
    }
  };

  const deleteEvolutionChart = async (evolutionChartId) => {
    try {
      await evolutionChartService.deleteEvolutionChart(evolutionChartId);
      setEvolutionCharts(evolutionCharts.filter(chart => chart.id !== evolutionChartId));
    } catch (error) {
      throw error; // Propagate the error to the caller
    }
  };

  return {
    evolutionCharts,
    loading,
    error,
    fetchEvolutionCharts,
    fetchEvolutionChartById,
    fetchEvolutionChartsByPatientId,
    createEvolutionChart,
    updateEvolutionChart,
    deleteEvolutionChart,
  };
};

export default useEvolutionCharts;
