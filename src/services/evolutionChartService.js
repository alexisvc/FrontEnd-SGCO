import axios from 'axios';

const baseURL = 'http://localhost:3001/api/evolution-charts'; // Ajusta la ruta base según tu configuración

const evolutionChartService = {
  async getAllEvolutionCharts() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async getEvolutionChartById(evolutionChartId) {
    try {
      const response = await axios.get(`${baseURL}/${evolutionChartId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async getEvolutionChartsByPatientId(patientId) {
    try {
      const response = await axios.get(`${baseURL}/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async createEvolutionChart(evolutionChart) {
    try {
      const response = await axios.post(baseURL, evolutionChart);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async updateEvolutionChart(evolutionChartId, evolutionChart) {
    try {
      const response = await axios.put(`${baseURL}/${evolutionChartId}`, evolutionChart);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async deleteEvolutionChart(evolutionChartId) {
    try {
      await axios.delete(`${baseURL}/${evolutionChartId}`);
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default evolutionChartService;
