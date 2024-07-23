import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/cirugia-patologia';

// Obtiene todas las cirugías patológicas
const getAllCirugiaPatologias = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Obtiene una cirugía patológica por su ID
const getCirugiaPatologiaById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// Obtiene una cirugía patológica por el ID del paciente
const getCirugiaPatologiaByPatientId = async (patientId) => {
  const response = await axios.get(`${baseUrl}/patient/${patientId}`);
  return response.data;
};

// Crea una nueva cirugía patológica
const createCirugiaPatologia = async (newCirugiaPatologia, archivo1, archivo2) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in newCirugiaPatologia) {
    formData.append(key, newCirugiaPatologia[key]);
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

// Actualiza una cirugía patológica por su ID
const updateCirugiaPatologia = async (id, updatedCirugiaPatologia, archivo1, archivo2) => {
  const formData = new FormData();
  
  // Agregar campos del formulario
  for (const key in updatedCirugiaPatologia) {
    formData.append(key, updatedCirugiaPatologia[key]);
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

// Elimina una cirugía patológica por su ID
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
