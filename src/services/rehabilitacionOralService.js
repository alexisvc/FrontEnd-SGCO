import axios from "axios";

const baseUrl = "http://localhost:3001/api/rehabilitacion-oral";

const getAllRehabilitacionOral = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getRehabilitacionOralById = (rehabilitacionOralId) => {
  return axios.get(`${baseUrl}/${rehabilitacionOralId}`).then((response) => response.data);
};

const getRehabilitacionOralByPatientId = (patientId) => {
  return axios.get(`${baseUrl}/patient/${patientId}`).then((response) => response.data);
};

const createRehabilitacionOral = (newRehabilitacionOral) => {
  return axios.post(baseUrl, newRehabilitacionOral).then((response) => response.data);
};

const updateRehabilitacionOral = (rehabilitacionOralId, updatedRehabilitacionOral) => {
  return axios.put(`${baseUrl}/${rehabilitacionOralId}`, updatedRehabilitacionOral).then((response) => response.data);
};

const deleteRehabilitacionOral = (rehabilitacionOralId) => {
  return axios.delete(`${baseUrl}/${rehabilitacionOralId}`).then((response) => response.data);
};

export default {
  getAllRehabilitacionOral,
  getRehabilitacionOralById,
  getRehabilitacionOralByPatientId,
  createRehabilitacionOral,
  updateRehabilitacionOral,
  deleteRehabilitacionOral,
};
