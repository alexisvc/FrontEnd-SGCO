import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/treatment-plans'; // Actualiza con la ruta correcta de tu backend

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

const create = async (newTreatmentPlan) => {
  const response = await axios.post(baseUrl, newTreatmentPlan);
  return response.data;
};

const update = async (id, updatedTreatmentPlan) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedTreatmentPlan);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  getById,
  getByPatientId,
  create,
  update,
  remove,
};
