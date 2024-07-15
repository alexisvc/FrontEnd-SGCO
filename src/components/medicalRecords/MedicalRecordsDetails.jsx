import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import CreateMedicalRecordForm from "./CreateMedicalRecordForm";
import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import MedicalRecordForm from "./MedicalRecordForm";

const MedicalRecordDetails = ({ patientId }) => {
  const { medicalRecords, createMedicalRecord, updateMedicalRecord } =
    useMedicalRecords();
  const [patientMedicalRecord, setPatientMedicalRecord] = useState(null);

  useEffect(() => {
    if (medicalRecords && medicalRecords.length > 0) {
      const record = medicalRecords.find(
        (record) => record.paciente && record.paciente.id === patientId
      );
      if (record) {
        setPatientMedicalRecord(record);
      } else {
        setPatientMedicalRecord(null); // Otra acción en caso de que no se encuentre el registro médico
      }
    }
  }, [medicalRecords, patientId]);

  return (
    <>
      {patientMedicalRecord ? (
        <MedicalRecordForm
          patientId={patientId}
          patientMedicalRecord={patientMedicalRecord}
          updateMedicalRecord={updateMedicalRecord}
        />
      ) : (
        <CreateMedicalRecordForm
          patientId={patientId}
          createMedicalRecord={createMedicalRecord}
        />
      )}
    </>
  );
};

export default MedicalRecordDetails;
