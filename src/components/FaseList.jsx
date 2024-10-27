// components/FaseList.js
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFases } from '../hooks/useFases';
import {
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

export function FaseList() {
  const { budgetId, procedimientoId, patientId } = useParams();
  const navigate = useNavigate();
  const { fases, loading, error, fetchFases, deleteFase } = useFases();

  useEffect(() => {
    loadFases();
  }, [budgetId, procedimientoId]);

  const loadFases = async () => {
    const { success, error } = await fetchFases(budgetId, procedimientoId);
    if (!success) {
      toast.error(error || 'Error al cargar las fases');
    }
  };

  const handleCreateFase = () => {
    navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/fases/create`);
  };

  const handleDeleteFase = async (faseId) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta fase?')) {
      const { success, error } = await deleteFase(budgetId, procedimientoId, faseId);
      if (success) {
        toast.success('Fase eliminada exitosamente');
      } else {
        toast.error(error || 'Error al eliminar la fase');
      }
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

      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4">
            Fases del Procedimiento
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateFase}
          >
            Nueva Fase
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Nombre de la Fase</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fases.map((fase) => (
                <TableRow key={fase.id}>
                  <TableCell align="center">{fase.nombreFase}</TableCell>
                  <TableCell align="center">${fase.totalFase}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/fases/${fase.id}/edit`)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteFase(fase._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {fases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1">
                      No hay fases registradas
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total del Procedimiento */}
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Typography variant="h6">
            Total del Procedimiento: $
            {fases.reduce((total, fase) => total + fase.totalFase, 0)}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}