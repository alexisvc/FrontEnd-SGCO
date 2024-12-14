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
  const { getReporteMensual } = useFinancialReports();
  const [presupuestosInfo, setPresupuestosInfo] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      if (!filteredTreatments.length) return;
      
      const presupuestos = {};
      for (let treatment of filteredTreatments) {
        if (treatment.budget) {
          presupuestos[treatment.id] = {
            total: treatment.budget.totalGeneral,
            estado: treatment.budget.estadoPagoGeneral
          };
        }
      }
      setPresupuestosInfo(presupuestos);
    };
    
    fetchData();
  }, [filteredTreatments]);

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
/*
      const filtered = patientTreatments.filter((treatment) => {
        const treatmentMonth = dayjs(treatment.fechaPlanTrat).format("MM");
        return treatmentMonth === selectedMonth;
*/
        const filtered = patientTreatments.filter(treatment => {
          return treatment.actividades.some(actividad => {
            const actividadMonth = dayjs(actividad.fechaPlanTrat).format("MM");
            return actividadMonth === selectedMonth;
      });
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
      <Container>
      <Typography variant="h4" gutterBottom>
        Consolidado de Planificaciones
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Filtrar por Mes</InputLabel>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          label="Filtrar por Mes"
        >
          <MenuItem value="">Todos los meses</MenuItem>
          {/* Meses... */}
          
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
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Actividades</TableCell>
                <TableCell>Presupuesto</TableCell>
                <TableCell>Estado Pagos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTreatments.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell>{treatment.paciente.nombrePaciente}</TableCell>
                  <TableCell>{treatment.especialidad}</TableCell>
                  <TableCell>
                    <List>
                      {treatment.actividades.map((act, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={act.cita}
                            secondary={`${act.actividadPlanTrat} - ${new Date(act.fechaPlanTrat).toLocaleDateString()}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    {treatment.budget ? 
                      `$${treatment.budget.totalGeneral}` : 
                      'Sin presupuesto'
                    }
                  </TableCell>
                  <TableCell>
                    {treatment.budget && 
                      <Chip 
                        label={treatment.budget.estadoPagoGeneral}
                        color={getPaymentStatusColor(treatment.budget.estadoPagoGeneral)}
                      />
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>

      
    </>
  );
};

export default AllTreatmentPlans;
