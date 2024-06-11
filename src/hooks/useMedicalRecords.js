// useMedicalRecords.js
import { useEffect, useState } from 'react';
import medicalRecordsService from '../services/medicalRecordsService'; // Asegúrate de ajustar la ruta si es necesario

const useMedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    // Función para cargar todas las historias clínicas al inicio
    const loadAllMedicalRecords = async () => {
      try {
        const records = await medicalRecordsService.getAllMedicalRecords();
        setMedicalRecords(records);
        console.log("Records");
      } catch (error) {
        console.error(error.message);
      }
    };

    // Llamar a la función para cargar las historias clínicas al inicio
    loadAllMedicalRecords();
  }, []);

  const fetchAllMedicalRecords = async () => {
    try {
      const records = await medicalRecordsService.getAllMedicalRecords();
      setMedicalRecords(records);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchMedicalRecordById = async (medicalRecordId) => {
    try {
      const record = await medicalRecordsService.getMedicalRecordById(medicalRecordId);
      return record;
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchMedicalRecordsByPatientId = async (patientId) => {
    try {
      const records = await medicalRecordsService.getMedicalRecordsByPatientId(patientId);
      setMedicalRecords(records);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createMedicalRecord = async (newMedicalRecord) => {
    try {
      const createdRecord = await medicalRecordsService.createMedicalRecord(newMedicalRecord);
      setMedicalRecords(prevRecords => [...prevRecords, createdRecord]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateMedicalRecord = async (medicalRecordId, updatedMedicalRecord) => {
    try {
      await medicalRecordsService.updateMedicalRecord(medicalRecordId, updatedMedicalRecord);
      // Aquí podrías actualizar los registros en el estado si es necesario
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteMedicalRecord = async (medicalRecordId) => {
    try {
      await medicalRecordsService.deleteMedicalRecord(medicalRecordId);
      setMedicalRecords(prevRecords => prevRecords.filter(record => record.id !== medicalRecordId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return { medicalRecords, fetchAllMedicalRecords, fetchMedicalRecordById, fetchMedicalRecordsByPatientId, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord };
};

export default useMedicalRecords;
