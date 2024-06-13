import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useMedicalRecords } from "../hooks/useMedicalRecords";
import MedicalRecordForm from "./medicalRecords/MedicalRecordForm";
import CreateMedicalRecordForm from "./medicalRecords/CreateMedicalRecordForm";
import PatientDetails from "./patients/PatientDetails";
import PatientTreatments from "./patientTreatments/PatientTreatments";
// Importar el componente PatientDetails

const PatientAndMedicalRecordDetails = ({
  updatePatient,
  patientTreatments,
  createPatientTreatment,
  updatePatientTreatment,
}) => {
  const { patientId } = useParams();
  const location = useLocation();
  const { patient } = location.state || {};
  const { medicalRecords, createMedicalRecord, updateMedicalRecord } =
    useMedicalRecords();
  const [patientMedicalRecord, setPatientMedicalRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (medicalRecords && medicalRecords.length > 0) {
      const record = medicalRecords.find(
        (record) => record.paciente.id === patientId
      );
      setPatientMedicalRecord(record);
    }
  }, [medicalRecords, patientId]);

  return (
    <div>
      <button onClick={() => navigate("/patients")}>
        <FaArrowCircleLeft />
        <span>Atrás</span>
      </button>
      {patient && (
        <PatientDetails patient={patient} updatePatient={updatePatient} />
      )}
      {patientMedicalRecord ? (
        <>
          <MedicalRecordForm
            patientId={patientId}
            updateMedicalRecord={updateMedicalRecord}
            patientMedicalRecord={patientMedicalRecord}
          />
        </>
      ) : (
        <CreateMedicalRecordForm
          patientId={patientId}
          createMedicalRecord={createMedicalRecord}
        />
      )}
      <PatientTreatments
            patientId={patientId}
            patientTreatments={patientTreatments}
            createPatientTreatment={createPatientTreatment}
            updatePatientTreatment={updatePatientTreatment}
          />
    </div>
  );
};

export default PatientAndMedicalRecordDetails;
