import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/budgets';

// Funciones existentes
const getAllBudgets = () => {
  return axios.get(baseUrl).then((response) => response.data);
};


const getBudgetById = async (id) => {
  try {
    console.log('Service - Fetching budget with ID:', id);
    
    if (!id) {
      throw new Error('ID no proporcionado');
    }

    const response = await axios.get(`${baseUrl}/${id}`);
    console.log('Service - Raw response:', response);

    if (!response.data) {
      throw new Error('No se recibieron datos del servidor');
    }

    return response.data;
  } catch (error) {
    console.error('Service - Error in getBudgetById:', error);
    
    if (error.response) {
      // Error de respuesta del servidor
      throw new Error(error.response.data.message || 'Error del servidor al obtener el presupuesto');
    } else if (error.request) {
      // Error de conexión
      throw new Error('Error de conexión al servidor');
    } else {
      // Otros errores
      throw error;
    }
  }
};

const getBudgetsByPatient = (patientId) => {
  return axios.get(`${baseUrl}/paciente/${patientId}`).then((response) => response.data);
};

const createBudget = (newBudget) => {
  return axios.post(baseUrl, newBudget).then((response) => response.data);
};

const updateBudget = (id, updatedBudget) => {
  return axios.put(`${baseUrl}/${id}`, updatedBudget).then((response) => response.data);
};

const updateBudgetStatus = (id, status) => {
  return axios.patch(`${baseUrl}/${id}/estado`, { estado: status })
    .then((response) => response.data);
};

const deleteBudget = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAllBudgets,
  getBudgetById,
  getBudgetsByPatient,
  createBudget,
  updateBudget,
  updateBudgetStatus,
  deleteBudget
};