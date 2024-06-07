import axios from "axios";
const baseUrl = "http://localhost:3001/api/patients";

const getAllPatients = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getPatientById = (patientId) => {
  return axios.get(`${baseUrl}/${patientId}`).then((response) => response.data);
};

const createPatient = (newPatient) => {
  return axios.post(baseUrl, newPatient).then((response) => response.data);
};

const updatePatient = (patientId, updatedPatient) => {
  return axios.put(`${baseUrl}/${patientId}`, updatedPatient).then((response) => response.data);
};

const deletePatient = (patientId) => {
  return axios.delete(`${baseUrl}/${patientId}`).then((response) => response.data);
};

export default {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
