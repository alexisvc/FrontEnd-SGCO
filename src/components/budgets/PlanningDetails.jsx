import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Grid,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import usePatientTreatments from '../../hooks/usePatientTreatments';
import { Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useBudgets } from '../../hooks/useBudgets';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (status) => ({
  'pendiente': 'default',
  'en-proceso': 'primary',
  'completado': 'success'
}[status] || 'default');

const PlanningDetails = ({ budget, treatmentDetails  }) => {
  const {
    patientTreatments,
    loading,
    error,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    updatePatientTreatment,
    deletePatientTreatment
  } = usePatientTreatments();

  const { createBudgetForTreatment } = useBudgets();
  const [showForm, setShowForm] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const patientId = budget?.paciente?._id || budget?.paciente?.id;
  const patientName = budget?.paciente?.nombrePaciente;
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
  
    const loadTreatments = async () => {
      // Si tenemos treatmentDetails directamente, usarlos
      if (treatmentDetails) {
        console.log('Using provided treatment details:', treatmentDetails);
        setCurrentTreatment(treatmentDetails);
        return;
      }
  
      // Si no hay treatmentDetails, intentar cargar desde la API
      if (!patientId || !budget?._id) {
        console.log('Missing data:', { patientId, budgetId: budget?._id });
        return;
      }
  
      try {
        console.log('Loading treatments for patient:', patientId);
        const treatments = await getPatientTreatmentsByPatientId(patientId);
  
        if (!isMounted) return;
  
        if (treatments?.length > 0) {
          const treatment = treatments.find(t => 
            t._id === (budget.treatmentPlan?._id || budget.treatmentPlan)
          );
  
          if (treatment) {
            console.log('Found treatment:', treatment);
            setCurrentTreatment(treatment);
          } else {
            console.log('No matching treatment found');
          }
        }
      } catch (error) {
        console.error('Error loading treatments:', error);
      }
    };
  
    loadTreatments();
  
    return () => {
      isMounted = false;
    };
  }, [patientId, budget?._id, budget?.treatmentPlan, treatmentDetails]);


  const handleCreateTreatment = async (treatmentData) => {
    try {
      const treatment = await createPatientTreatment({
        ...treatmentData,
        paciente: patientId
      });
  
      const budgetData = {
        paciente: patientId,
        especialidad: treatment.especialidad,
        fases: [{
          nombre: 'Fase Inicial',
          descripcion: treatment.actividadPlanTrat,
          procedimientos: []
        }]
      };
      await createBudgetForTreatment(treatment.id, budgetData);
      setShowForm(false);
    } catch (error) {
      toast.error('Error al crear el tratamiento y presupuesto');
    }
  };

  const handleUpdateTreatment = async (id, treatmentData) => {
    try {
      await updatePatientTreatment(id, treatmentData);
      setEditingTreatment(null);
    } catch (error) {
      console.error('Error updating treatment:', error);
    }
  };

  const handleUpdateActivityStatus = async (activityIndex, newStatus) => {
    try {
      const updatedActivities = currentTreatment.actividades.map((act, index) => 
        index === activityIndex ? { ...act, estado: newStatus } : act
      );
  
      const treatmentId = currentTreatment._id;
      if (!treatmentId) {
        throw new Error('ID de tratamiento no disponible');
      }
  
      // Crear objeto con solo los campos necesarios
      const updateData = {
        _id: treatmentId,
        paciente: currentTreatment.paciente._id || currentTreatment.paciente.id,
        especialidad: currentTreatment.especialidad,
        actividades: updatedActivities
      };
  
      await updatePatientTreatment(treatmentId, updateData);
  
      // Actualizar el estado local
      setCurrentTreatment(prev => ({
        ...prev,
        actividades: updatedActivities
      }));
  
      toast.success('Estado actualizado exitosamente');
    } catch (error) {
      console.error('Error updating activity status:', error);
      toast.error('Error al actualizar el estado');
    }
  };

  const handleDeleteTreatment = async (id) => {
    try {
      await deletePatientTreatment(id);
    } catch (error) {
      console.error('Error deleting treatment:', error);
    }
  };

  const handleEditTreatment = (treatment) => {
    setEditingTreatment(treatment);
    setShowForm(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }



  return (
    <Container>
      {currentTreatment ? (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Planificación - {currentTreatment.especialidad}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/planificacion/editar/${currentTreatment._id}`)}
          >
            Editar Planificación
          </Button>

    <TableContainer component={Paper} style={{ marginTop: 30 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cita</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTreatment.actividades?.map((actividad, index) => (
                <TableRow key={index}>
                  <TableCell>Cita {actividad.cita}</TableCell>
                  <TableCell>
                    <Typography>{actividad.actividadPlanTrat}</Typography>
                    {actividad.montoAbono > 0 && (
                      <Typography variant="caption" color="textSecondary">
                        Abono: ${actividad.montoAbono}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={actividad.estado}
                      color={getStatusColor(actividad.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {actividad.estado !== 'completado' && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleUpdateActivityStatus(
                          index, 
                          actividad.estado === 'pendiente' ? 'en-proceso' : 'completado'
                        )}
                      >
                        {actividad.estado === 'pendiente' ? 'Iniciar' : 'Completar'}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Resumen de Actividades</Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <Typography>
                  Total Actividades: {currentTreatment.actividades?.length || 0}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  Completadas: {
                    currentTreatment.actividades?.filter(a => a.estado === 'completado').length || 0
                  }
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  Abonos Sugeridos: ${
                    currentTreatment.actividades?.reduce((sum, act) => sum + (Number(act.montoAbono) || 0), 0) || 0
                  }
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      ) : (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography gutterBottom>
            Este presupuesto no tiene una planificación asociada.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/planificacion/nueva')}
            sx={{ mt: 2 }}
          >
            Crear Nueva Planificación
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PlanningDetails;