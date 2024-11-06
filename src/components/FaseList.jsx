// components/FaseList.js
import React, { useEffect, useState } from 'react';
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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [faseToDelete, setFaseToDelete] = useState(null);

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

  const handleOpenDeleteDialog = (fase) => {
    setFaseToDelete(fase);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setFaseToDelete(null);
  };

  const handleConfirmDelete = async (faseId) => {
    try {
      const { success } = await deleteFase(budgetId, procedimientoId, faseId);
      if (success) {
        toast.success('Fase eliminada exitosamente');
        setFases(prevFases => prevFases.filter(fase => fase._id !== faseId));
      } else {
        toast.error('Error al eliminar la fase');
      }
    } catch (err) {
      console.error('Error al eliminar la fase:', err);
      toast.error('Error al eliminar la fase');
    }
    handleCloseDeleteDialog();
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos`)}
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
                <TableRow key={fase._id}>
                  <TableCell align="center">{fase.nombreFase}</TableCell>
                  <TableCell align="center">${fase.totalFase}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/fases/${fase._id}/edit`)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleOpenDeleteDialog(fase)}
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Estás seguro que deseas eliminar esta fase?
        </DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={() => handleConfirmDelete(faseToDelete._id)} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}