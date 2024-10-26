// services/budgetProcedimientosService.js
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/budgets';

const getProcedimientosByBudget = (budgetId) => {
  return axios.get(`${baseUrl}/${budgetId}/procedimientos`).then((response) => response.data);
};

const createProcedimiento = (budgetId, procedimiento) => {
  return axios.post(`${baseUrl}/${budgetId}/procedimientos`, procedimiento)
    .then((response) => response.data);
};

const getProcedimientoById = (budgetId, procedimientoId) => {
  return axios.get(`${baseUrl}/${budgetId}/procedimientos/${procedimientoId}`)
    .then((response) => response.data);
};

const createFase = (budgetId, procedimientoId, fase) => {
  return axios.post(`${baseUrl}/${budgetId}/procedimientos/${procedimientoId}/fases`, fase)
    .then((response) => response.data);
};

const deleteProcedimiento = (budgetId, procedimientoId) => {
  return axios.delete(`${baseUrl}/${budgetId}/procedimientos/${procedimientoId}`)
    .then((response) => response.data);
};

export default {
  getProcedimientosByBudget,
  createProcedimiento,
  getProcedimientoById,
  createFase,
  deleteProcedimiento
};