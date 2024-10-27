// services/procedimientosService.js
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/budgets';

const getProcedimientos = (budgetId) => {
  return axios.get(`${baseUrl}/${budgetId}`)
    .then(response => response.data.procedimientos);
};

const createProcedimiento = async (budgetId, { nombreProcedimiento }) => {
  return axios.post(
    `${baseUrl}/${budgetId}/procedimientos`, 
    { nombreProcedimiento }
  ).then(response => response.data);
};

const deleteProcedimiento = (budgetId, procedimientoId) => {
  return axios.delete(`${baseUrl}/${budgetId}/procedimientos/${procedimientoId}`)
    .then(response => response.data);
};

export default {
  getProcedimientos,
  createProcedimiento,
  deleteProcedimiento
};