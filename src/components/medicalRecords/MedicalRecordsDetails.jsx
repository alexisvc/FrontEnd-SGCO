import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import CreateMedicalRecordForm from "./CreateMedicalRecordForm";
import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import MedicalRecordForm from "./MedicalRecordForm";

const MedicalRecordDetails = () => {
  const { patientId } = useParams();
  const {medicalRecords, createMedicalRecord, updateMedicalRecord } = useMedicalRecords();
  const [patientMedicalRecord, setPatientMedicalRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("Medical Records: ", medicalRecords);
    if (useMedicalRecords && medicalRecords.length > 0) {
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
        <MedicalRecordForm patientId={patientId} updateMedicalRecord={updateMedicalRecord} patientMedicalRecord={patientMedicalRecord} />
      ) : (
        <CreateMedicalRecordForm patientId={patientId} createMedicalRecord={createMedicalRecord}/>
      )}
    </div>
  );
};

export default MedicalRecordDetails;
