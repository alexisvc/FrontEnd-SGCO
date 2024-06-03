import axios from "axios";
const baseUrl = "http://localhost:3001/api/pictograms";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllPictograms = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getPictogramsByUserId = (userId) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.get(`${baseUrl}/${userId}`, config).then((response) => response.data);
};

const createPictogram = (formData) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post(baseUrl, formData, config).then((response) => response.data);
};

const updatePictogram = (id, updatedPictogram) => {
  const formData = new FormData();

  // Agrega los campos de texto al FormData
  formData.append('name', updatedPictogram.name);
  formData.append('category', updatedPictogram.category);

  if (updatedPictogram.image) {
    // Agrega la nueva imagen al FormData
    formData.append('image', updatedPictogram.image);
  }

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios
    .put(`${baseUrl}/${id}`, formData, config)
    .then((response) => response.data);
};

const deletePictogram = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  getAllPictograms,
  getPictogramsByUserId,
  createPictogram,
  updatePictogram,
  setToken,
  deletePictogram,
};
