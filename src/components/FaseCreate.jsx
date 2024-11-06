// components/FaseCreate.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFases } from '../hooks/useFases';
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

export function FaseCreate({ createFase }) {
  const { patientId, budgetId, procedimientoId } = useParams();
  const navigate = useNavigate();
  const [fases, setFases] = useState([
    { nombreFase: '', totalFase: '' }
  ]);

  const handleAddFase = () => {
    setFases([...fases, { nombreFase: '', totalFase: '' }]);
  };

  const handleRemoveFase = (index) => {
    const nuevasFases = fases.filter((_, i) => i !== index);
    setFases(nuevasFases);
  };

  const handleFaseChange = (index, field, value) => {
    const nuevasFases = fases.map((fase, i) => 
      i === index ? { ...fase, [field]: value } : fase
    );
    setFases(nuevasFases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fasesValidas = fases.every(
      fase => fase.nombreFase.trim() && fase.totalFase > 0
    );

    if (!fasesValidas) {
      toast.error('Todas las fases deben tener nombre y total válido');
      return;
    }

    try {
      let allSuccess = true;
      
      for (const fase of fases) {
        const { success, error } = await createFase(budgetId, procedimientoId, {
          nombreFase: fase.nombreFase.trim(),
          totalFase: Number(fase.totalFase)
        });

        if (!success) {
          toast.error(`Error al crear la fase ${fase.nombreFase}: ${error}`);
          allSuccess = false;
          break;
        }
      }

      if (allSuccess) {
        toast.success('Fases creadas exitosamente');
        navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/fases`);
      }
    } catch (error) {
      console.error('Error al crear fases:', error);
      toast.error('Error al crear las fases');
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
        Agregar Fases
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          {fases.map((fase, index) => (
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
                    disabled={fases.length === 1}
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
            Agregar Otra Fase
          </Button>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Guardar Fases
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}