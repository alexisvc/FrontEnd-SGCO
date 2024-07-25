import axios from "axios";

const baseUrl = "http://localhost:3001/api/rehabilitacion-oral";

const getAllRehabilitacionOral = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getRehabilitacionOralById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getRehabilitacionOralByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

const createRehabilitacionOral = async (newRehabilitacionOral, archivo1, archivo2) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in newRehabilitacionOral) {
    formData.append(key, newRehabilitacionOral[key]);
  }
  
  // Agregar archivos si existen
  if (archivo1) {
    formData.append('archivo1', archivo1);
  }
  
  if (archivo2) {
    formData.append('archivo2', archivo2);
  }

  const response = await axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const updateRehabilitacionOral = async (id, updatedRehabilitacionOral, archivo1, archivo2) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in updatedRehabilitacionOral) {
    formData.append(key, updatedRehabilitacionOral[key]);
  }
  
  // Agregar archivos si existen
  if (archivo1) {
    formData.append('archivo1', archivo1);
  }
  
  if (archivo2) {
    formData.append('archivo2', archivo2);
  }

  const response = await axios.put(`${baseUrl}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const deleteRehabilitacionOral = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllRehabilitacionOral,
  getRehabilitacionOralById,
  getRehabilitacionOralByPatientId,
  createRehabilitacionOral,
  updateRehabilitacionOral,
  deleteRehabilitacionOral,
};
