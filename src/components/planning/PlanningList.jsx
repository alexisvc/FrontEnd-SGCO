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
  Chip,
  CircularProgress
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
import usePatientTreatments from '../../hooks/usePatientTreatments'; 
import budgetService from '../../services/budgetService';

const PlanningList = () => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { 
    patientTreatments, 
    getAllPatientTreatments, 
    deletePatientTreatment 
  } = usePatientTreatments();

  useEffect(() => {
    const loadData = async () => {
      try {
        await getAllPatientTreatments();
      } catch (error) {
        console.error('PlanningList - Error loading data:', error);
        toast.error('Error al cargar las planificaciones');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getAllPatientTreatments]);



  const handleSearch = async () => {
      try {
        if (!searchQuery.trim()) {
          await fetchBudgets();
          return;
        }
    
        let filtered;
        if (searchType === 'cedula') {
          filtered = budgets.filter(budget => 
            budget.paciente?.numeroCedula?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else {
          filtered = budgets.filter(budget =>
            budget.paciente?.nombrePaciente?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
    
        setFilteredBudgets(filtered);
    
        if (filtered.length === 0) {
          toast.info('No se encontraron presupuestos');
        }
      } catch (error) {
        toast.error('Error al buscar presupuestos');
      }
  };


  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta planificación?')) {
      try {
        await deletePatientTreatment(id);
        await getAllPatientTreatments();
        toast.success('Planificación eliminada exitosamente');
      } catch (error) {
        toast.error('Error al eliminar la planificación. \nVerifique que no existan Presupuestos asignados para este Plan de Tratamientos');
      }
    }
  };

  const handleCreateBudget = async (treatment) => {
    try {
      if (treatment.budget) {
        // Si ya tiene presupuesto, navegar a él
        navigate(`/presupuestos/${treatment.budget}`);
      } else {
        // Crear nuevo presupuesto
        navigate('/presupuestos/nuevo', { 
          state: { treatmentPlanId: treatment._id }
        });
      }
    } catch (error) {
      toast.error('Error al gestionar presupuesto');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }


  if (!patientTreatments || patientTreatments.length === 0) {
    return (
      <Box textAlign="center" p={3}>
        <Typography>No hay planificaciones disponibles</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/planificacion/nueva')}
          sx={{ mt: 2 }}
        >
          Crear Nueva Planificación
        </Button>
      </Box>
    );
  }

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
                
                <TableRow key={treatment._id}>
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
                      onClick={() => handleCreateBudget(treatment)}
                      title="Crear/Ver Presupuesto"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/planificacion/editar/${treatment._id}`)}
                      title="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(treatment._id)}
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