// services/fasesService.js
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/budgets';

const getFases = (budgetId, procedimientoId) => {
  return axios.get(`${baseUrl}/${budgetId}/procedimientos/${procedimientoId}`)
    .then(response => response.data.fases);
};

const createFase = (budgetId, procedimientoId, fase) => {
  return axios.post(
    `${baseUrl}/${budgetId}/procedimientos/${procedimientoId}/fases`,
    fase
  ).then(response => response.data);
};

const updateFase = (budgetId, procedimientoId, faseId, fase) => {
  return axios.put(
    `${baseUrl}/${budgetId}/procedimientos/${procedimientoId}/fases/${faseId}`,
    fase
  ).then(response => response.data);
};

const deleteFase = (budgetId, procedimientoId, faseId) => {
  return axios.delete(
    `${baseUrl}/${budgetId}/procedimientos/${procedimientoId}/fases/${faseId}`
  ).then(response => response.data);
};

export default {
  getFases,
  createFase,
  updateFase,
  deleteFase
};