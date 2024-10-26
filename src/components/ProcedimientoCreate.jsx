// components/ProcedimientoCreate.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBudgetProcedimientos } from '../hooks/useBudgetProcedimientos';
import {
  Button,
  Typography,
  Container,
  TextField,
  Paper,
  Box,
  Grid,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

export function ProcedimientoCreate() {
  const { budgetId } = useParams();
  const navigate = useNavigate();
  const { createProcedimiento, loading, error } = useBudgetProcedimientos();

  const [procedimiento, setProcedimiento] = useState({
    nombreProcedimiento: '',
    fases: [{ nombreFase: '', totalFase: '' }]
  });

  const handleAddFase = () => {
    setProcedimiento(prev => ({
      ...prev,
      fases: [...prev.fases, { nombreFase: '', totalFase: '' }]
    }));
  };

  const handleRemoveFase = (index) => {
    setProcedimiento(prev => ({
      ...prev,
      fases: prev.fases.filter((_, i) => i !== index)
    }));
  };

  const handleFaseChange = (index, field, value) => {
    setProcedimiento(prev => ({
      ...prev,
      fases: prev.fases.map((fase, i) => 
        i === index ? { ...fase, [field]: value } : fase
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!procedimiento.nombreProcedimiento.trim()) {
      toast.error('El nombre del procedimiento es requerido');
      return;
    }

    const fasesValidas = procedimiento.fases.every(
      fase => fase.nombreFase.trim() && fase.totalFase > 0
    );
    if (!fasesValidas) {
      toast.error('Todas las fases deben tener nombre y total válido');
      return;
    }

    const { success, error } = await createProcedimiento(budgetId, {
      ...procedimiento,
      fases: procedimiento.fases.map(fase => ({
        ...fase,
        totalFase: Number(fase.totalFase)
      }))
    });

    if (success) {
      toast.success('Procedimiento creado exitosamente');
      navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos`);
    } else {
      toast.error(error || 'Error al crear el procedimiento');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <Container maxWidth="md">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
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
            value={procedimiento.nombreProcedimiento}
            onChange={(e) => setProcedimiento(prev => ({
              ...prev,
              nombreProcedimiento: e.target.value
            }))}
            margin="normal"
            required
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Fases
          </Typography>

          {procedimiento.fases.map((fase, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label="Nombre de la Fase"
                    value={fase.nombreFase}
                    onChange={(e) => handleFaseChange(index, 'nombreFase', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Total de la Fase"
                    value={fase.totalFase}
                    onChange={(e) => handleFaseChange(index, 'totalFase', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveFase(index)}
                    disabled={procedimiento.fases.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}

          <Button
            type="button"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddFase}
            sx={{ mt: 2 }}
          >
            Agregar Fase
          </Button>

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