import React from "react";
import EditEvolutionChartForm from "./EditEvolutionChartForm";
import CreateEvolutionChartForm from "./CreateEvolutionChartForm";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const EvolutionChartsDetails = ({
  patientId,
  evolutionCharts,
  createEvolutionChart,
  updateEvolutionChart,
  fetchEvolutionCharts,
  
}) => {

  // Función para manejar la creación de un nuevo tratamiento
  const handleCreateEvolutionCharts = async (formData) => {
    const newEvolutionChartData = {
      ...formData,
      paciente: patientId,
    };
    await createEvolutionChart(newEvolutionChartData);
    //await fetchEvolutionCharts();
  };

  // Función para manejar la actualización de un tratamiento existente
  const handleUpdateEvolutionCharts = async (id, formData) => {
    await updateEvolutionChart(id, formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx = {{ marginBottom: 3, marginTop: 5}} align="center">
        Cuadro de Evolución
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'><Typography variant='h7'>Fecha</Typography></TableCell>
              <TableCell align='center'><Typography variant='h7'>Actividad Clínica</Typography></TableCell>
              <TableCell align='center'><Typography variant='h7'>Recomendación</Typography></TableCell>
              <TableCell align='center'><Typography variant='h7'>Firma Odontólogo</Typography></TableCell>
              <TableCell align='center'><Typography variant='h7'>Firma Paciente</Typography></TableCell>
              <TableCell align='center'><Typography variant='h7'>Acciones</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mostrar cada cuadro de evolución existente como una fila editable */}
            {evolutionCharts.map((chart) => (
              <EditEvolutionChartForm
                key={chart.id}
                evolutionChartId={chart.id}
                evolutionChartData={{
                  fechaCuadEvol: chart.fechaCuadEvol.split("T")[0],
                  actividadCuadEvol: chart.actividadCuadEvol,
                  recomendacionCuadEvol: chart.recomendacionCuadEvol,
                  firmaOdon: chart.firmaOdon,
                  firmaPaciente: chart.firmaPaciente,
                }}
                updateEvolutionChart={handleUpdateEvolutionCharts}
              />
            ))}

            {/* Fila para crear un nuevo cuadro de evolución */}
            <CreateEvolutionChartForm
              patientId={patientId}
              createEvolutionChart={handleCreateEvolutionCharts}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EvolutionChartsDetails;
