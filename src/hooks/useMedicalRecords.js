import { useEffect, useState } from 'react';
import medicalRecordsService from '../services/medicalRecordsService';

export function useMedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    medicalRecordsService.getAllMedicalRecords()
      .then(data => {
        setMedicalRecords(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const fetchMedicalRecordById = (id) => {
    setLoading(true);
    medicalRecordsService.getMedicalRecordById(id)
      .then(data => {
        setMedicalRecord(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const fetchMedicalRecordsByPatientId = (patientId) => {
    setLoading(true);
    medicalRecordsService.getMedicalRecordsByPatientId(patientId)
      .then(data => {
        setMedicalRecords(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const createMedicalRecord = (newMedicalRecord) => {
    setLoading(true);
    medicalRecordsService.createMedicalRecord(newMedicalRecord)
      .then(data => {
        setMedicalRecords([...medicalRecords, data]);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const updateMedicalRecord = (id, updatedMedicalRecord) => {
    setLoading(true);
    medicalRecordsService.updateMedicalRecord(id, updatedMedicalRecord)
      .then(data => {
        setMedicalRecords(medicalRecords.map(record => record.id === id ? data : record));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  const deleteMedicalRecord = (id) => {
    setLoading(true);
    medicalRecordsService.deleteMedicalRecord(id)
      .then(() => {
        setMedicalRecords(medicalRecords.filter(record => record.id !== id));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    medicalRecords,
    medicalRecord,
    loading,
    error,
    fetchMedicalRecordById,
    fetchMedicalRecordsByPatientId,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
  };
}
