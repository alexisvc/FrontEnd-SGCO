import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import CreateMedicalRecordForm from "./CreateMedicalRecordForm";
import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import MedicalRecordForm from "./MedicalRecordForm";

const MedicalRecordDetails = ({ patientId }) => {
  const { medicalRecord, fetchMedicalRecordsByPatientId, createMedicalRecord, updateMedicalRecord } =
    useMedicalRecords();

  useEffect(() => {
    fetchMedicalRecordsByPatientId(patientId);
  }, [patientId]);

  return (
    <>
      {medicalRecord ? (
        <MedicalRecordForm
          patientId={patientId}
          patientMedicalRecord={medicalRecord}
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
