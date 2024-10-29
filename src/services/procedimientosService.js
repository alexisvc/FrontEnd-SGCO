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

const deleteProcedimiento = async (budgetId, procedimientoId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${budgetId}/procedimientos/${procedimientoId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || 'Error al eliminar el procedimiento' };
  }
};

export default {
  getProcedimientos,
  createProcedimiento,
  deleteProcedimiento
};