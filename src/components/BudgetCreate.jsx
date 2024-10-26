// components/BudgetCreate.js
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useBudgets } from '../hooks/useBudgets';
import {
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

export function BudgetCreate() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { createBudget, loading, error } = useBudgets();
  const patient = location.state?.patient;

  const handleCreateBudget = async () => {
    try {
      const { success, data } = await createBudget({
        paciente: patientId,
        procedimientos: []
      });

      if (success) {
        toast.success('Presupuesto creado exitosamente');
        // Navegar a la página para agregar procedimientos
        navigate(`/patients/${patientId}/budgets/${data.id}/procedimientos`);
      } else {
        toast.error('Error al crear el presupuesto');
      }
    } catch (error) {
      toast.error('Error al crear el presupuesto');
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>

      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Crear Nuevo Presupuesto
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información del Paciente
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Nombre:</strong> {patient?.nombrePaciente}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Cédula:</strong> {patient?.numeroCedula}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Al crear un nuevo presupuesto, podrás agregar procedimientos y sus fases correspondientes.
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleCreateBudget}
            >
              Crear Presupuesto
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}