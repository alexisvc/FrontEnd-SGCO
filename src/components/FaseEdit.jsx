// components/FaseEdit.js
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
import { useFases } from '../hooks/useFases';

export function FaseEdit({ fetchFases, updateFase }) {
  const { budgetId, procedimientoId, faseId, patientId } = useParams();
  const navigate = useNavigate();
  const [fases, setFases] = useState([]);
  const [nombreFase, setNombreFase] = useState('');
  const [totalFase, setTotalFase] = useState(0);

  useEffect(() => {
    const loadFases = async () => {
      try {
        const { success, data } = await fetchFases(budgetId, procedimientoId);
        if (success) {
          setFases(data);
          const fase = data.find(f => f._id === faseId);
          if (fase) {
            setNombreFase(fase.nombreFase);
            setTotalFase(fase.totalFase);
          }
        }
      } catch (err) {
        console.error('Error al cargar fases:', err);
      }
    };
    loadFases();
  }, [budgetId, procedimientoId, faseId, fetchFases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreFase.trim()) {
      toast.error('El nombre de la fase es requerido');
      return;
    }

    try {
      const { success, data, error } = await updateFase(budgetId, procedimientoId, faseId, {
        nombreFase,
        totalFase
      });

      if (success) {
        toast.success('Fase actualizada exitosamente');
        navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/fases`);
      } else {
        toast.error(error || 'Error al actualizar la fase');
      }
    } catch (error) {
      console.error('Error al actualizar fase:', error);
      toast.error('Error al actualizar la fase');
    }
  };

  return (
    <Container maxWidth="md">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/fases`)}
        sx={{ mt: 2, mb: 4 }}
      >
        Atrás
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Editar Fase
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre de la Fase"
            value={nombreFase}
            onChange={(e) => setNombreFase(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Total de la Fase"
            type="number"
            value={totalFase}
            onChange={(e) => setTotalFase(parseFloat(e.target.value))}
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
              Actualizar Fase
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}