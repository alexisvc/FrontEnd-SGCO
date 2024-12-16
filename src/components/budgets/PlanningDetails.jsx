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
  Grid
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
    const loadTreatments = async () => {
      if (!patientId || !budget?._id) return;

      try {
        await getPatientTreatmentsByPatientId(patientId);
        // La búsqueda del tratamiento actual se hará cuando se actualice patientTreatments
      } catch (error) {
        console.error('Error loading treatments:', error);
      }
    };

    loadTreatments();
  }, [patientId, budget?._id]);

  useEffect(() => {
    if (patientTreatments.length > 0 && budget?._id) {
      const treatment = patientTreatments.find(t => t.budget?._id === budget._id);
      setCurrentTreatment(treatment || null);
    }
  }, [patientTreatments, budget?._id]);

  useEffect(() => {
    if (treatmentDetails) {
      setCurrentTreatment(treatmentDetails);
    }
  }, [treatmentDetails]);

  //const currentTreatment = patientTreatments.find(t => t.budget?._id === budget?._id);

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
  
      await updatePatientTreatment(currentTreatment.id, {
        ...currentTreatment,
        actividades: updatedActivities
      });
  
      toast.success('Estado actualizado exitosamente');
    } catch (error) {
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
      onClick={() => navigate(`/planificacion/editar/${currentTreatment.id}`)}
    >
      Editar Planificación
    </Button>

          <List>
            {currentTreatment.actividades?.map((actividad, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      Cita {actividad.cita}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography>{actividad.actividadPlanTrat}</Typography>
                      <Typography variant="caption">
                        Fecha: {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                      </Typography>
                      {actividad.montoAbono > 0 && (
                        <Typography variant="body2">
                          Abono: ${actividad.montoAbono}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
    <Chip
      label={actividad.estado}
      color={getStatusColor(actividad.estado)}
    />
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
  </Box>
              </ListItem>
            ))}
          </List>

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
        <Typography>No se encontró la planificación asociada</Typography>
      )}
    </Container>
  );
};

export default PlanningDetails;