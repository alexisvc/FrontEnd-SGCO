// endodonticTreatmentService.js
import axios from "axios";

const baseUrl = "http://localhost:3001/api/endodontic-treatment";

const getAllEndodonticTreatments = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getEndodonticTreatmentById = (endodonticTreatmentId) => {
  return axios.get(`${baseUrl}/${endodonticTreatmentId}`).then((response) => response.data);
};

const getEndodonticTreatmentsByPatientId = (patientId) => {
  return axios.get(`${baseUrl}/patient/${patientId}`).then((response) => response.data);
};

const createEndodonticTreatment = (newEndodonticTreatment) => {
  return axios.post(baseUrl, newEndodonticTreatment).then((response) => response.data);
};

const updateEndodonticTreatment = (endodonticTreatmentId, updatedEndodonticTreatment) => {
  return axios.put(`${baseUrl}/${endodonticTreatmentId}`, updatedEndodonticTreatment).then((response) => response.data);
};

const deleteEndodonticTreatment = (endodonticTreatmentId) => {
  return axios.delete(`${baseUrl}/${endodonticTreatmentId}`).then((response) => response.data);
};

export default {
  getAllEndodonticTreatments,
  getEndodonticTreatmentById,
  getEndodonticTreatmentsByPatientId,
  createEndodonticTreatment,
  updateEndodonticTreatment,
  deleteEndodonticTreatment,
};
