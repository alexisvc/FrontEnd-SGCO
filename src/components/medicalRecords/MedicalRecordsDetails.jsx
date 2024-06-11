import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

const MedicalRecordDetails = ({ user, medicalRecords }) => {
  const { patientId } = useParams();
  const [patientMedicalRecord, setPatientMedicalRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar que medicalRecords tenga un valor antes de acceder a su longitud o buscar en él
    //console.log(medicalRecords);
    if (medicalRecords && medicalRecords.length > 0) {
      // Encuentra el historial clínico del paciente actual
      const record = medicalRecords.find(
        (record) => record.paciente.id === patientId
      );
      setPatientMedicalRecord(record);
    }
  }, [medicalRecords, patientId]);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/patients");
        }}
      >
        <FaArrowCircleLeft />
        <span>Atrás</span>
      </button>
      {patientMedicalRecord ? (
        <div>
          <h2>Historia Clínica del Paciente</h2>
          <p>Fecha: {patientMedicalRecord.date}</p>
          <p>Descripción: {patientMedicalRecord.description}</p>
        </div>
      ) : (
        <h1>No se encontro Historia Clinica</h1>
      )}
    </div>
  );
};

export default MedicalRecordDetails;
