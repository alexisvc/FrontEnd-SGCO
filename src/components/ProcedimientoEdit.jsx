// components/ProcedimientoEdit.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Typography,
  Container,
  TextField,
  Paper,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

export function ProcedimientoEdit({ fetchProcedimientos, updateProcedimiento }) {
  const { budgetId, patientId, procedimientoId } = useParams();
  const navigate = useNavigate();
  const [procedimientos, setProcedimientos] = useState([]);
  const [nombreProcedimiento, setNombreProcedimiento] = useState('');

  useEffect(() => {
    const loadProcedimientos = async () => {
      try {
        const { success, data } = await fetchProcedimientos(budgetId);
        if (success) {
          setProcedimientos(data);
          const procedimiento = data.find(proc => proc._id === procedimientoId);
          if (procedimiento) {
            setNombreProcedimiento(procedimiento.nombreProcedimiento);
          }
        }
      } catch (err) {
        console.error('Error al cargar procedimientos:', err);
      }
    };
    loadProcedimientos();
  }, [budgetId, procedimientoId, fetchProcedimientos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreProcedimiento.trim()) {
      toast.error('El nombre del procedimiento es requerido');
      return;
    }

    try {
      const { success, data, error } = await updateProcedimiento(budgetId, procedimientoId, {
        nombreProcedimiento
      });

      if (success) {
        toast.success('Procedimiento actualizado exitosamente');
        navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos`);
      } else {
        toast.error(error || 'Error al actualizar el procedimiento');
      }
    } catch (error) {
      console.error('Error al actualizar procedimiento:', error);
      toast.error('Error al actualizar el procedimiento');
    }
  };

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
        Editar Procedimiento
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
              Actualizar Procedimiento
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}