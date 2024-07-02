// periodonticTreatmentService.js
import axios from "axios";

const baseUrl = "http://localhost:3001/api/periodoncia";

const getAllPeriodonticTreatments = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getPeriodonticTreatmentById = (periodonticTreatmentId) => {
  return axios.get(`${baseUrl}/${periodonticTreatmentId}`).then((response) => response.data);
};

const getPeriodonticTreatmentsByPatientId = (patientId) => {
  return axios.get(`${baseUrl}/patient/${patientId}`).then((response) => response.data);
};

const createPeriodonticTreatment = (newPeriodonticTreatment) => {
  return axios.post(baseUrl, newPeriodonticTreatment).then((response) => response.data);
};

const updatePeriodonticTreatment = (periodonticTreatmentId, updatedPeriodonticTreatment) => {
  return axios.put(`${baseUrl}/${periodonticTreatmentId}`, updatedPeriodonticTreatment).then((response) => response.data);
};

const deletePeriodonticTreatment = (periodonticTreatmentId) => {
  return axios.delete(`${baseUrl}/${periodonticTreatmentId}`).then((response) => response.data);
};

export default {
  getAllPeriodonticTreatments,
  getPeriodonticTreatmentById,
  getPeriodonticTreatmentsByPatientId,
  createPeriodonticTreatment,
  updatePeriodonticTreatment,
  deletePeriodonticTreatment,
};
