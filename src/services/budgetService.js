// services/budgetService.js
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/budgets';

const getAllBudgets = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getBudgetsByPatient = (patientId) => {
  return axios.get(`${baseUrl}/paciente/${patientId}`).then((response) => response.data);
};

const getBudgetById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const createBudget = (newBudget) => {
  return axios.post(baseUrl, newBudget).then((response) => response.data);
};

const deleteBudget = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAllBudgets,
  getBudgetsByPatient,
  getBudgetById,
  createBudget,
  deleteBudget
};