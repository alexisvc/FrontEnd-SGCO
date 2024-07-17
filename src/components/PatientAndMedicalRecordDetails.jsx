import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MedicalRecordDetails from "./medicalRecords/MedicalRecordsDetails";
import PatientDetails from "./patients/PatientDetails";
import TreamentPlansDetails from "./treatmentPlans/TreamentPlansDetails";
import EvolutionChartsDetails from "./evolutionCharts/EvolutionChartsDetails";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EndodonticTreamentsDetails from "./endodonticTreatments/EndodonticTreatmentsDetails";
import PeriodonticTreatmentsDetails from "./periodonticTreatments/PeriodonticTreatmentsDetails";
import OrtodonciaDetails from "./ortodoncia/OrtodonciaDetails";
import CirugiaPatologiaDetails from "./cirugiaPatologia/CirugiaPatologiaDetails";
import RehabilitacionOralDetails from "./rehabilitacionOral/RehabilitacionOralDetails";
import DisfuncionMandibularDetails from "./disfuncionMandibular/DisfuncionMandibularDetails";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const PatientAndMedicalRecordDetails = ({
  updatePatient,
  patientTreatments,
  createPatientTreatment,
  updatePatientTreatment,
  getPatientTreatmentsByPatientId,
  evolutionCharts,
  createEvolutionChart,
  updateEvolutionChart,
  fetchEvolutionChartsByPatientId,
  endodonticTreatments,
    createEndodonticTreatment,
    updateEndodonticTreatment,
    fetchEndodonticTreatmentsByPatientId
}) => {
  // Tomamos el patientId de la URL
  const { patientId } = useParams();
  const location = useLocation();
  const { patient } = location.state || {};

  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/patients")}
        sx={{ mb: 2 }}
      >
        Atrás
      </Button>

      <PatientDetails patient={patient} updatePatient={updatePatient} />

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            overflow: "auto",
            mt: 5,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="patient treatments tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Detalles Médicos" {...a11yProps(0)} />
            <Tab label="Plan de Tratamiento" {...a11yProps(1)} />
            <Tab label="Cuadro de Evolución" {...a11yProps(2)} />
            <Tab label="Cirugía y Patología" {...a11yProps(3)} />
            <Tab label="Endodoncia" {...a11yProps(4)} />
            <Tab label="Ortodoncia" {...a11yProps(5)} />
            <Tab label="Rehabilitación Oral" {...a11yProps(6)} />
            <Tab label="Disfunción Mandibular" {...a11yProps(7)} />
            <Tab label="Periodoncia" {...a11yProps(8)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <MedicalRecordDetails patientId={patientId} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <TreamentPlansDetails
            patientId={patientId}
            patientTreatments={patientTreatments}
            createPatientTreatment={createPatientTreatment}
            updatePatientTreatment={updatePatientTreatment}
            getPatientTreatmentsByPatientId={getPatientTreatmentsByPatientId}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <EvolutionChartsDetails 
          patientId={patientId} 
          evolutionCharts={evolutionCharts}
          createEvolutionChart={createEvolutionChart}
          updateEvolutionChart={updateEvolutionChart}
          fetchEvolutionChartsByPatientId={fetchEvolutionChartsByPatientId}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <CirugiaPatologiaDetails patientId={patientId} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <EndodonticTreamentsDetails 
          patientId={patientId} 
          endodonticTreatments={endodonticTreatments}
          createEndodonticTreatment={createEndodonticTreatment}
          updateEndodonticTreatment={updateEndodonticTreatment}
          fetchEndodonticTreatmentsByPatientId={fetchEndodonticTreatmentsByPatientId}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={5}>
          <OrtodonciaDetails patientId={patientId} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={6}>
          <RehabilitacionOralDetails patientId={patientId} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={7}>
          <DisfuncionMandibularDetails patientId={patientId} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={8}>
          <PeriodonticTreatmentsDetails patientId={patientId} />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default PatientAndMedicalRecordDetails;
