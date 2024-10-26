// components/BudgetList.js
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBudgets } from '../hooks/useBudgets';
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

export function BudgetList() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { budgets, loading, error, fetchBudgetsByPatient } = useBudgets();

  useEffect(() => {
    fetchBudgetsByPatient(patientId);
  }, [patientId]);

  const handleViewBudget = (budgetId) => {
    navigate(`/patients/${patientId}/budgets/${budgetId}/procedimientos`);
  };

  const handleCreateBudget = () => {
    navigate(`/patients/${patientId}/budgets/create`);
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
          Presupuestos del Paciente
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateBudget}
          sx={{ mb: 3 }}
        >
          Crear Nuevo Presupuesto
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Fecha</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Procedimientos</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell align="center">
                    {new Date(budget.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    ${budget.totalPresupuesto}
                  </TableCell>
                  <TableCell align="center">
                    {budget.procedimientos.length}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewBudget(budget.id)}>
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