import React, { useEffect } from "react";
import EditTreatmentForm from "./EditTreatmentForm";
import CreateTreatmentForm from "./CreateTreatmentForm";
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
} from "@mui/material";
import usePatientTreatments from "../../hooks/usePatientTreatments";

const TreamentPlansDetails = ({
  patientId,
  patientTreatments,
  createPatientTreatment,
  updatePatientTreatment,
  getPatientTreatmentsByPatientId,
}) => {
  // Cargar los tratamientos del paciente al montar el componente
  useEffect(() => {
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
    <Container component={Paper}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: 3, marginTop: 5 }}
        align="center"
      >
        Tratamientos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h7">Cita</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h7">Actividad Plan Tratamiento</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h7">Fecha Plan Tratamiento</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h7">Monto Abono</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h7">Acciones</Typography>
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
    </Container>
  );
};

export default TreamentPlansDetails;
