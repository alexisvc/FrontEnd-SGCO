import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  CircularProgress,
  Grid
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TreatmentForm from './TreatmentForm';
import TreatmentList from './TreatmentList';
import usePatientTreatments from '../../hooks/usePatientTreatments';
import { toast } from 'react-toastify';

const PlanningDetails = ({ budget }) => {
  const {
    patientTreatments,
    loading,
    error,
    getPatientTreatmentsByPatientId,
    createPatientTreatment,
    updatePatientTreatment,
    deletePatientTreatment
  } = usePatientTreatments();

  const [showForm, setShowForm] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);

  const patientId = budget?.paciente?._id || budget?.paciente?.id;
  const patientName = budget?.paciente?.nombrePaciente;

  useEffect(() => {
    if (patientId) {
      getPatientTreatmentsByPatientId(patientId);
    }
  }, [patientId]);

  const handleCreateTreatment = async (treatmentData) => {
    if (!patientId) {
      toast.error('No se encontró el paciente');
      return;
    }

    try {
      await createPatientTreatment({
        ...treatmentData,
        paciente: patientId
      });
      setShowForm(false);
      await getPatientTreatmentsByPatientId(patientId);
      toast.success('Tratamiento creado exitosamente');
    } catch (error) {
      console.error('Error creating treatment:', error);
      toast.error('Error al crear el tratamiento');
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

  const totalAbonado = patientTreatments.reduce(
    (sum, treatment) => sum + Number(treatment.montoAbono), 
    0
  );

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
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Planes de Tratamiento
            </Typography>
            {patientName && (
              <Typography variant="subtitle1" color="textSecondary">
                Paciente: {patientName}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingTreatment(null);
                setShowForm(true);
              }}
            >
              Nuevo Tratamiento
            </Button>
          </Grid>
        </Grid>

        {showForm && (
          <Box mt={3}>
            <TreatmentForm
              initialData={editingTreatment}
              onSubmit={editingTreatment ? handleUpdateTreatment : handleCreateTreatment}
              onCancel={() => {
                setShowForm(false);
                setEditingTreatment(null);
              }}
            />
          </Box>
        )}

        <Box mt={3}>
          <TreatmentList
            treatments={patientTreatments}
            onEdit={handleEditTreatment}
            onDelete={handleDeleteTreatment}
          />
        </Box>

        <Paper sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Resumen de Montos Abonados
          </Typography>
          <Typography variant="h5" align="center" color="primary">
            Total Abonado: ${totalAbonado.toFixed(2)}
          </Typography>
        </Paper>
      </Paper>
    </Container>
  );
};

export default PlanningDetails;