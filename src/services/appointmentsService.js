import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/appointments';

const getAllAppointments = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getAppointmentsByOdontologo = (odontologoId) => {
  return axios.get(`${baseUrl}/odontologo/${odontologoId}`).then((response) => response.data);
};

const createAppointment = (newAppointment) => {
  return axios.post(baseUrl, newAppointment).then((response) => response.data);
};

const deleteAppointment = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAllAppointments,
  getAppointmentsByOdontologo,
  createAppointment,
  deleteAppointment,
};
