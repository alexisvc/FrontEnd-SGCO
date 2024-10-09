import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TreatmentPlansSummary from "./TreatmentPlansSummary";
import usePatientTreatments from "../../hooks/usePatientTreatments";
import { useParams } from "react-router";
import EditTreatmentForm from "./EditTreatmentForm";
import CreateTreatmentForm from "./CreateTreatmentForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const TreatmentPlans = ({
    patientTreatments,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    updatePatientTreatment,
}) => {
  
  const { patientId } = useParams(); // ID del paciente seleccionado
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching treatments for patient", patientId);
    getPatientTreatmentsByPatientId(patientId);  
  }, [patientId]);

  // Función para manejar la creación de un nuevo tratamiento
  const handleCreateTreatment = async (formData) => {
    const newTreatmentData = {
      ...formData,
      paciente: patientId,
    };
    await createPatientTreatment(newTreatmentData);
  };

  // Función para manejar la actualización de un tratamiento existente
  const handleUpdateTreatment = async (id, formData) => {
    await updatePatientTreatment(id, formData);
  };

  return (
    <>
    <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/planificacion/pacientes")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
    <Container sx={{ pb: 2 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ pt: 2, pb: 1 }}>
        Planes de Tratamiento
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">Cita</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Actividad</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Fecha</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Monto Abono</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mostrar cada tratamiento existente como una fila editable */}
            {patientTreatments.map((treatment) => (
              <EditTreatmentForm
                key={treatment.id}
                treatmentId={treatment.id}
                treatmentData={{
                  cita: treatment.cita,
                  actividadPlanTrat: treatment.actividadPlanTrat,
                  fechaPlanTrat: treatment.fechaPlanTrat.split("T")[0],
                  montoAbono: treatment.montoAbono,
                }}
                updatePatientTreatment={handleUpdateTreatment}
              />
            ))}

            {/* Fila para crear un nuevo tratamiento */}
            <CreateTreatmentForm
              patientId={patientId}
              createPatientTreatment={handleCreateTreatment}
            />
          </TableBody>
        </Table>
      </TableContainer>

      {/* Resumen del total de los montos abonados */}
      <TreatmentPlansSummary patientTreatments={patientTreatments} />
    </Container>
    </>
    
  );
};

export default TreatmentPlans;
