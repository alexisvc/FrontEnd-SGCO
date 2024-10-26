// components/ProcedimientoList.js
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBudgetProcedimientos } from '../hooks/useBudgetProcedimientos';
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
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function ProcedimientoList() {
  const { budgetId } = useParams();
  const navigate = useNavigate();
  const { procedimientos, loading, error, fetchProcedimientosByBudget } = useBudgetProcedimientos();

  useEffect(() => {
    fetchProcedimientosByBudget(budgetId);
    console.log('fetchProcedimientosByBudget', budgetId);
    console.log('procedimientos', procedimientos);
  }, [budgetId]);

  const handleViewProcedimiento = (procedimientoId) => {
    navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/${procedimientoId}`);
  };

  const handleCreateProcedimiento = () => {
    navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos/create`);
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
                <TableRow key={procedimiento.id}>
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
                    <IconButton onClick={() => handleViewProcedimiento(procedimiento.id)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}