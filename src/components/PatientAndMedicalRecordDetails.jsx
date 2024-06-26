import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useMedicalRecords } from "../hooks/useMedicalRecords";
import MedicalRecordForm from "./medicalRecords/MedicalRecordForm";
import CreateMedicalRecordForm from "./medicalRecords/CreateMedicalRecordForm";
import PatientDetails from "./patients/PatientDetails";
import TreamentPlansDetails from "./treatmentPlans/TreamentPlansDetails";
import EvolutionChartsDetails from "./evolutionCharts/EvolutionChartsDetails";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EndodonticTreamentsDetails from "./endodonticTreatments/EndodonticTreatmentsDetails";
// Importar el componente PatientDetails

const PatientAndMedicalRecordDetails = ({
  updatePatient,
  patientTreatments,
  createPatientTreatment,
  updatePatientTreatment,
  getAllPatientTreatments,
  getPatientTreatmentsByPatientId,
  evolutionCharts,
  createEvolutionChart,
  updateEvolutionChart,
  fetchEvolutionCharts,
  fetchEvolutionChartsByPatientId,
  endodonticTreatments,
  createEndodonticTreatment,
  updateEndodonticTreatment,
  fetchEndodonticTreatmentsByPatientId,
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
      const record = medicalRecords.find(record => record.paciente && record.paciente.id === patientId);
      if (record) {
        setPatientMedicalRecord(record);
      } else {
        setPatientMedicalRecord(null); // Otra acción en caso de que no se encuentre el registro médico
      }
    }
  }, [medicalRecords, patientId]);
  
  useEffect(() => {
    getPatientTreatmentsByPatientId(patientId);
  }, [patientId, patientTreatments]); // Dependencia específica para actualizar datos según patientId
  useEffect(() => {
    fetchEvolutionChartsByPatientId(patientId);
  }, [patientId, evolutionCharts]); // Dependencia específica para actualizar datos según patientId
  useEffect(() => {
    fetchEndodonticTreatmentsByPatientId(patientId);
  }, [patientId, endodonticTreatments]); // Dependencia específica para actualizar datos según patientId

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/patients")}
        sx={{ mb: 2 }}
      >
        Atrás
      </Button>

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
      <TreamentPlansDetails
        patientId={patientId}
        patientTreatments={patientTreatments}
        createPatientTreatment={createPatientTreatment}
        updatePatientTreatment={updatePatientTreatment}
        getAllPatientTreatments={getAllPatientTreatments}
      />
      <EvolutionChartsDetails
        patientId={patientId}
        evolutionCharts={evolutionCharts}
        createEvolutionChart={createEvolutionChart}
        updateEvolutionChart={updateEvolutionChart}
        fetchEvolutionCharts={fetchEvolutionCharts}
      />

      <EndodonticTreamentsDetails
        patientId={patientId}
        endodonticTreatments={endodonticTreatments}
        createEndodonticTreatment={createEndodonticTreatment}
        updateEndodonticTreatment={updateEndodonticTreatment}
      />
    </div>
  );
};

export default PatientAndMedicalRecordDetails;
