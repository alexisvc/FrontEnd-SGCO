import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlanningList = ({ 
  patientTreatments, 
  getAllPatientTreatments,
  deleteTreatment 
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        await getAllPatientTreatments();
        console.log('Planificaciones cargadas:', patientTreatments); // Para debug
      } catch (error) {
        console.error('Error loading treatments:', error);
        toast.error('Error al cargar las planificaciones');
      }
    };
    
    loadTreatments();
  }, [getAllPatientTreatments]);  // Dependencia importante

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta planificación?')) {
      try {
        await deleteTreatment(id);
        toast.success('Planificación eliminada exitosamente');
      } catch (error) {
        toast.error('Error al eliminar la planificación');
      }
    }
  };

  if (loading) return <Typography align="center">Cargando...</Typography>;

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/planificacion")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5">Planificaciones</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/planificacion/nueva')}
              >
                Nueva Planificación
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Actividades</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientTreatments.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell>{treatment.paciente.nombrePaciente}</TableCell>
                  <TableCell>{treatment.especialidad}</TableCell>
                  <TableCell>
                    {treatment.actividades.length} actividades
                    <Typography variant="caption" display="block">
                      {treatment.actividades.filter(a => a.estado === 'completado').length} completadas
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={treatment.budget ? 'Con presupuesto' : 'Sin presupuesto'}
                      color={treatment.budget ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => navigate(`/presupuestos/paciente/${treatment.paciente._id}`)}
                      title="Ver presupuestos"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/planificacion/editar/${treatment.id}`)}
                      title="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(treatment.id)}
                      title="Eliminar"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default PlanningList;