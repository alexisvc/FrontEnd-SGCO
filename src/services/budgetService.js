import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/budgets';

const getAllBudgets = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getBudgetById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
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