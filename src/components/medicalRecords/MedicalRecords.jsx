import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';

const MedicalRecords = () => {
  const { patientId } = useParams(); // Obtenemos el ID del paciente de los parámetros de la ruta
  const { medicalRecords, fetchMedicalRecordsByPatientId } = useMedicalRecords();

  useEffect(() => {
    // Llamamos a la función para obtener las historias clínicas del paciente al montar el componente
    fetchMedicalRecordsByPatientId(patientId);
  }, [patientId, fetchMedicalRecordsByPatientId]); // Aseguramos que el efecto se ejecute cuando cambie el ID del paciente

  // No es necesario filtrar las historias clínicas aquí, ya que se están obteniendo específicamente por el ID del paciente

  return (
    <div>
      <h1>Medical Records</h1>
      <h2>{patientId}</h2>
      <div>
        <h3>Lista de Historias Clínicas</h3>
        <ul>
          {medicalRecords.map((record) => (
            <li key={record.id}>
              <p>Date: {record.date}</p>
              <p>Description: {record.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicalRecords;
