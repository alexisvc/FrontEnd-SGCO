// components/ProcedimientoList.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

export function ProcedimientoList({ fetchProcedimientos, createProcedimiento, updateProcedimiento, deleteProcedimiento }) {
  const { budgetId, patientId } = useParams();
  const navigate = useNavigate();
  const [procedimientos, setProcedimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [procedimientoToDelete, setProcedimientoToDelete] = useState(null);

  useEffect(() => {
    const loadProcedimientos = async () => {
      setLoading(true);
      try {
        const { success, data, error } = await fetchProcedimientos(budgetId);
        if (success) {
          setProcedimientos(data);
        } else {
          setError(error);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    loadProcedimientos();
  }, [budgetId, fetchProcedimientos]);

  const handleViewProcedimiento = (procedimientoId) => {
    navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/fases`);
  };

  const handleEditProcedimiento = (procedimientoId) => {
    navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}/edit`);
  };

  const handleCreateProcedimiento = () => {
    navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/create`);
  };

  const handleOpenDeleteDialog = (procedimiento) => {
    setProcedimientoToDelete(procedimiento);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProcedimientoToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (procedimientoToDelete) {
      try {
        await deleteProcedimiento(budgetId, procedimientoToDelete._id);
        const { success, data, error } = await fetchProcedimientos(budgetId);
        if (success) {
          setProcedimientos(data);
          toast.success('Procedimiento eliminado exitosamente');
        } else {
          toast.error(error || 'Error al eliminar el procedimiento');
        }
        handleCloseDeleteDialog();
      } catch (error) {
        console.error('Error al eliminar procedimiento:', error);
        toast.error('Error al eliminar el procedimiento');
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
        onClick={() => navigate(`/patients/${patientId}/budgets`)}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>

      <Container>
        <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: 4 }}>
          Procedimientos del Presupuesto
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateProcedimiento}
          sx={{ mb: 3 }}
        >
          Agregar Nuevo Procedimiento
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Procedimiento</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Fases</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {procedimientos.map((procedimiento) => (
                <TableRow key={procedimiento._id}>
                  <TableCell align="center">
                    {procedimiento.nombreProcedimiento}
                  </TableCell>
                  <TableCell align="center">
                    ${procedimiento.totalProcedimiento}
                  </TableCell>
                  <TableCell align="center">
                    {procedimiento.fases.length}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewProcedimiento(procedimiento._id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditProcedimiento(procedimiento._id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteDialog(procedimiento)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Estás seguro que deseas eliminar este procedimiento?
        </DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}