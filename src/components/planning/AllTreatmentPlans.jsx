import React, { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TreatmentPlansSummary from "./TreatmentPlansSummary";
import usePatientTreatments from "../../hooks/usePatientTreatments";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AllTreatmentPlans = () => {
  const {
    patientTreatments,
    getAllPatientTreatments,
  } = usePatientTreatments();

  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState(""); // Estado para el mes seleccionado
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Activar el estado de carga
      await getAllPatientTreatments();
      setIsLoading(false); // Desactivar el estado de carga
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterTreatmentsByMonth();
  }, [selectedMonth, patientTreatments]);

  const filterTreatmentsByMonth = () => {
    if (!selectedMonth) {
      setFilteredTreatments(patientTreatments);
    } else {
      const filtered = patientTreatments.filter((treatment) => {
        const treatmentMonth = dayjs(treatment.fechaPlanTrat).format("MM");
        return treatmentMonth === selectedMonth;
      });
      setFilteredTreatments(filtered);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/planificacion")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
      <Container sx={{ pb: 2 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ pt: 2, pb: 1 }}>
          Consolidado Planes de Tratamiento
        </Typography>

        {/* Filtro por mes */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Filtrar por Mes</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Filtrar por Mes"
          >
            <MenuItem value="">Todos los meses</MenuItem>
            <MenuItem value="01">Enero</MenuItem>
            <MenuItem value="02">Febrero</MenuItem>
            <MenuItem value="03">Marzo</MenuItem>
            <MenuItem value="04">Abril</MenuItem>
            <MenuItem value="05">Mayo</MenuItem>
            <MenuItem value="06">Junio</MenuItem>
            <MenuItem value="07">Julio</MenuItem>
            <MenuItem value="08">Agosto</MenuItem>
            <MenuItem value="09">Septiembre</MenuItem>
            <MenuItem value="10">Octubre</MenuItem>
            <MenuItem value="11">Noviembre</MenuItem>
            <MenuItem value="12">Diciembre</MenuItem>
          </Select>
        </FormControl>

        {isLoading ? (
          <Typography align="center" sx={{ mt: 4, mb: 2 }}>
            Cargando tratamientos...
          </Typography>
        ) : filteredTreatments.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">Paciente</Typography>
                  </TableCell>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTreatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell align="center">{treatment.paciente.nombrePaciente}</TableCell>
                    <TableCell align="center">{treatment.cita}</TableCell>
                    <TableCell align="center">{treatment.actividadPlanTrat}</TableCell>
                    <TableCell align="center">{treatment.fechaPlanTrat.split("T")[0]}</TableCell>
                    <TableCell align="center">{treatment.montoAbono}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography align="center" sx={{ mt: 4, mb: 2 }}>
            No se encontraron tratamientos.
          </Typography>
        )}

        {/* Resumen del total de los montos abonados */}
        <TreatmentPlansSummary patientTreatments={filteredTreatments} />
      </Container>
    </>
  );
};

export default AllTreatmentPlans;
