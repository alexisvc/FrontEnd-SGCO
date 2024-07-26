import axios from "axios";

const baseUrl = "http://localhost:3001/api/ortodoncia";

const getAllOrtodoncias = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOrtodonciaById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getOrtodonciasByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

const createOrtodoncia = async (newOrtodoncia, archivo1, archivo2, archivo3) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in newOrtodoncia) {
    formData.append(key, newOrtodoncia[key]);
  }
  
  // Agregar archivos si existen
  if (archivo1) {
    formData.append('archivo1', archivo1);
  }
  
  if (archivo2) {
    formData.append('archivo2', archivo2);
  }

  if (archivo3) {
    formData.append('archivo3', archivo3);
  }

  const response = await axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const updateOrtodoncia = async (id, updatedOrtodoncia, archivo1, archivo2, archivo3) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in updatedOrtodoncia) {
    formData.append(key, updatedOrtodoncia[key]);
  }
  
  // Agregar archivos si existen
  if (archivo1) {
    formData.append('archivo1', archivo1);
  }
  
  if (archivo2) {
    formData.append('archivo2', archivo2);
  }

  if (archivo3) {
    formData.append('archivo3', archivo3);
  }

  const response = await axios.put(`${baseUrl}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
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
