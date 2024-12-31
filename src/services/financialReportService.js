import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/financial-reports';

const getReporteMensual = (mes, año) => {
  return axios.get(`${baseUrl}/mensual`, { params: { mes, año } })
    .then(response => response.data);
};

const getReporteAnual = (año) => {
  return axios.get(`${baseUrl}/anual`, { params: { año } })
    .then(response => response.data);
};

const getReportePorRango = (fechaInicio, fechaFin) => {
  return axios.get(`${baseUrl}/rango`, { 
    params: { fechaInicio, fechaFin } 
  }).then(response => response.data);
};

const create = (reportData) => {
  return axios.post(baseUrl, reportData)
    .then(response => response.data);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default {
  getReporteMensual,
  getReporteAnual,
  getReportePorRango,
  create,
  formatCurrency,
  formatDate
};