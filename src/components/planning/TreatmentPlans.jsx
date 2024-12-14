import React, { useEffect } from "react";
import {
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  Box,
  Chip ,
  Button,
  Typography,
  Container,
  Paper
} from "@mui/material";
import TreatmentPlansSummary from "./TreatmentPlansSummary";
import usePatientTreatments from "../../hooks/usePatientTreatments";
import { useBudgets } from '../../hooks/useBudgets';
import { useParams } from "react-router";
import EditTreatmentForm from "./EditTreatmentForm";
import CreateTreatmentForm from "./CreateTreatmentForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

/*
const TreatmentPlans = ({
    patientTreatments,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    updatePatientTreatment,
}) => {
  */

const getStatusColor = (status) => ({
  'pendiente': 'default',
  'en-proceso': 'primary',
  'completado': 'success'
}[status] || 'default');

const TreatmentPlans = () => {
  const {
    patientTreatments,
    loading,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    updatePatientTreatment,
  } = usePatientTreatments();

  //const { patientId } = useParams(); // ID del paciente seleccionado
  const { createBudgetFromTreatment } = useBudgets();
  const navigate = useNavigate();
  const { patientId } = useParams();

  useEffect(() => {
    const fetchTreatments = async () => {
      if (!patientId) {
        console.error('PatientId undefined:', patientId);
        return;
      }
      
      try {
        await getPatientTreatmentsByPatientId(patientId);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };
  
    fetchTreatments();
  }, [patientId]);

  // Función para manejar la creación de un nuevo tratamiento
  const handleCreateTreatment = async (formData) => {
    const newTreatmentData = {
      ...formData,
      paciente: patientId,
    };
    await createPatientTreatment(newTreatmentData);
  };

  const handleCreateBudget = async (treatmentId) => {
    try {
      const result = await createBudgetFromTreatment(treatmentId);
      if (result.success) {
        toast.success('Presupuesto creado exitosamente');
        navigate(`/presupuestos/${result.data._id}`);
      }
    } catch (error) {
      toast.error('Error al crear el presupuesto');
    }
  };

  // Función para manejar la actualización de un tratamiento existente
  const handleUpdateTreatment = async (id, formData) => {
    await updatePatientTreatment(id, formData);
  };

  const handleEditClick = (treatmentId) => {
    navigate(`/planificacion/editar/${treatmentId}`);
   };
   
   const handleCreateClick = () => {
    navigate('/planificacion/nueva');
   };

   const updateActivityStatus = async (treatmentId, activityIndex, newStatus) => {
    // Actualizar planificación
    const updatedTreatment = await updatePatientTreatment(treatmentId, {
      actividades: treatment.actividades.map((act, idx) => 
        idx === activityIndex ? {...act, estado: newStatus} : act
      )
    });
  
    // Actualizar presupuesto si existe
    if (updatedTreatment.budget) {
      await updateBudgetStatus(updatedTreatment.budget._id, activityIndex, {
        estado: newStatus,
        procedimientos: [{...updatedTreatment.actividades[activityIndex]}]
      });
    }
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

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

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
  <Typography variant="h4">Planificaciones</Typography>
  <Button
    variant="contained"
    onClick={() => navigate('/planificacion/nueva')}
  >
    Nueva Planificación
  </Button>
</Box>


    
      <Container>
        <Typography variant="h4" gutterBottom>
          Planificaciones
        </Typography>

        {patientTreatments.map((treatment) => (
          <Paper key={treatment.id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
            <Grid container spacing={2} justifyContent="space-between">
  <Grid item>
    <Typography variant="h6">
      Especialidad: {treatment.especialidad}
    </Typography>
  </Grid>
  <Grid item>
    <Button
      variant="outlined"
      onClick={() => navigate(`/planificacion/editar/${treatment.id}`)}
    >
      Editar
    </Button>
  </Grid>
</Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Especialidad: {treatment.especialidad}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Actividades:</Typography>
                <List>
                  {treatment.actividades?.map((actividad, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Cita ${actividad.cita}`}
                        secondary={
                          <Box>
                            <Typography>{actividad.actividadPlanTrat}</Typography>
                            <Typography variant="caption">
                              Fecha: {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                            </Typography>
                            {actividad.montoAbono > 0 && (
                              <Typography>
                                Monto Abono: ${actividad.montoAbono}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <Chip 
                        label={actividad.estado} 
                        color={getStatusColor(actividad.estado)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12}>
                {treatment.budget ? (
                  <Box display="flex" gap={2} alignItems="center">
                    <Typography>
                      Presupuesto: ${treatment.budget.totalGeneral}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/presupuestos/${treatment.budget._id}`)}
                    >
                      Ver Presupuesto
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleCreateBudget(treatment.id)}
                  >
                    Crear Presupuesto
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}

        <TreatmentPlansSummary patientTreatments={patientTreatments} />
      </Container>
    
    </>
    
  );
};

export default TreatmentPlans;
