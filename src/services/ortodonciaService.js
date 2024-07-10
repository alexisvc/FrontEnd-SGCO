import axios from "axios";

const baseUrl = "http://localhost:3001/api/ortodoncia";

const getAllOrtodoncias = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getOrtodonciaById = (ortodonciaId) => {
  return axios.get(`${baseUrl}/${ortodonciaId}`).then((response) => response.data);
};

const getOrtodonciasByPatientId = (patientId) => {
  return axios.get(`${baseUrl}/patient/${patientId}`).then((response) => response.data);
};

const createOrtodoncia = (newOrtodoncia) => {
  return axios.post(baseUrl, newOrtodoncia).then((response) => response.data);
};

const updateOrtodoncia = (ortodonciaId, updatedOrtodoncia) => {
  return axios.put(`${baseUrl}/${ortodonciaId}`, updatedOrtodoncia).then((response) => response.data);
};

const deleteOrtodoncia = (ortodonciaId) => {
  return axios.delete(`${baseUrl}/${ortodonciaId}`).then((response) => response.data);
};

export default {
  getAllOrtodoncias,
  getOrtodonciaById,
  getOrtodonciasByPatientId,
  createOrtodoncia,
  updateOrtodoncia,
  deleteOrtodoncia,
};
