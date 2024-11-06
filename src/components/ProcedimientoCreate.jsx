// components/ProcedimientoCreate.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';;
import {
  Button,
  Typography,
  Container,
  TextField,
  Paper,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import { useProcedimientos } from '../hooks/useProcedimientos';

export function ProcedimientoCreate() {
  const { budgetId, patientId } = useParams();
  const navigate = useNavigate();
  const { createProcedimiento, loading } = useProcedimientos();

  const [nombreProcedimiento, setNombreProcedimiento] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreProcedimiento.trim()) {
      toast.error('El nombre del procedimiento es requerido');
      return;
    }

    try {
      const { success, data, error } = await createProcedimiento(budgetId, {
        nombreProcedimiento
      });

      if (success) {
        toast.success('Procedimiento creado exitosamente');
        navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos`);
      } else {
        toast.error(error || 'Error al crear el procedimiento');
      }
    } catch (error) {
      console.error('Error al crear procedimiento:', error);
      toast.error('Error al crear el procedimiento');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <Container maxWidth="md">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos`)}
        sx={{ mt: 2, mb: 4 }}
      >
        Atrás
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Crear Nuevo Procedimiento
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre del Procedimiento"
            value={nombreProcedimiento}
            onChange={(e) => setNombreProcedimiento(e.target.value)}
            margin="normal"
            required
          />

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Crear Procedimiento
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}