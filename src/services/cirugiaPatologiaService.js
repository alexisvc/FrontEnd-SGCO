import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/cirugia-patologia';

const getAllCirugiaPatologias = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getCirugiaPatologiaById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getCirugiaPatologiaByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

const createCirugiaPatologia = async (newCirugiaPatologia) => {
  const response = await axios.post(baseUrl, newCirugiaPatologia);
  return response.data;
};

const updateCirugiaPatologia = async (id, updatedCirugiaPatologia) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedCirugiaPatologia);
  return response.data;
};

const deleteCirugiaPatologia = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllCirugiaPatologias,
  getCirugiaPatologiaById,
  getCirugiaPatologiaByPatientId,
  createCirugiaPatologia,
  updateCirugiaPatologia,
  deleteCirugiaPatologia
};
