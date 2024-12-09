import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TextField,
  Box,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ArrowBack as ArrowBackIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import budgetService from '../../services/budgetService';

const BudgetList = ({ budgets, loading, error, fetchBudgets, isPatientView = false }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('cedula');
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        await fetchBudgets();
      } catch (error) {
        toast.error('Error al cargar los presupuestos');
      }
    };
    loadBudgets();
  }, [fetchBudgets]);

  useEffect(() => {
    if (budgets) {
      setFilteredBudgets(budgets);
    }
  }, [budgets]);

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        await fetchBudgets();
        return;
      }

      let filtered;
      if (searchType === 'cedula') {
        filtered = budgets.filter(budget => 
          budget.paciente.numeroCedula.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filtered = budgets.filter(budget =>
          budget.paciente.nombrePaciente.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredBudgets(filtered);

      if (filtered.length === 0) {
        toast.info('No se encontraron presupuestos');
      }
    } catch (error) {
      toast.error('Error al buscar presupuestos');
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSearchType('cedula');
    fetchBudgets();
  };

  const handleDeleteClick = (budget) => {
    setBudgetToDelete(budget);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!budgetToDelete) return;
      await budgetService.deleteBudget(budgetToDelete._id);
      toast.success('Presupuesto eliminado exitosamente');
      setDeleteDialogOpen(false);
      setBudgetToDelete(null);
      fetchBudgets();
    } catch (error) {
      toast.error('Error al eliminar el presupuesto');
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      borrador: 'default',
      emitido: 'primary',
      aceptado: 'success',
      rechazado: 'error'
    };
    return statusColors[status] || 'default';
  };

  const getPaymentStatusColor = (status) => {
    const paymentColors = {
      pendiente: 'warning',
      parcial: 'info',
      completado: 'success'
    };
    return paymentColors[status] || 'default';
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return <Typography align="center">Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(isPatientView ? "/planificacion" : "/planificacion")}
        sx={{ mb: 2 }}
      >
        Atrás
      </Button>
        
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Presupuestos
                  </Typography>
                </Grid>
                {!isPatientView && (
                  <>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Buscar por</InputLabel>
                        <Select
                          value={searchType}
                          onChange={(e) => setSearchType(e.target.value)}
                          label="Buscar por"
                        >
                          <MenuItem value="cedula">Cédula</MenuItem>
                          <MenuItem value="nombre">Nombre</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label={searchType === 'cedula' ? 'Ingrese cédula' : 'Ingrese nombre'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSearch}
                      >
                        Buscar
                      </Button>
                    </Grid>
         
                  </>
                )}
                </Grid>

<Grid container spacing={2} alignItems="center" sx={{marginTop:2}}>
                <Grid item xs={12} sm={3}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/planificacion/pacientes')}
                      >
                        Nueva Planificación
                      </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/presupuestos/nuevo')}
                  >
                    Nuevo Presupuesto
                  </Button>
                </Grid>

                </Grid>
              
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Cédula</TableCell>
                    <TableCell>Especialidad</TableCell>
                    <TableCell align="right">Total</TableCell>
                    {/*<TableCell align="center">Estado</TableCell>*/}
                    <TableCell align="center">Estado Pago</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBudgets.map((budget) => (
                    <TableRow key={budget._id}>
                      <TableCell>{formatDate(budget.fecha)}</TableCell>
                      <TableCell>{budget.paciente.nombrePaciente}</TableCell>
                      <TableCell>{budget.paciente.numeroCedula}</TableCell>
                      <TableCell>{budget.especialidad}</TableCell>
                      <TableCell align="right">{formatCurrency(budget.totalGeneral)}</TableCell>
                      {/*
                      <TableCell align="center">
                        <Chip 
                          label={budget.estado}
                          color={getStatusColor(budget.estado)}
                          size="small"
                        />
                      </TableCell>
                      */}
                      <TableCell align="center">
                        <Chip 
                          label={budget.estadoPagoGeneral}
                          color={getPaymentStatusColor(budget.estadoPagoGeneral)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => navigate(`/presupuestos/${budget._id}`)}
                          title="Ver detalles"
                        >
                          <ViewIcon />
                        </IconButton>
                        {budget.estado === 'borrador' && (
                          <>
                            <IconButton
                              onClick={() => navigate(`/presupuestos/editar/${budget._id}`)}
                              title="Editar"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(budget)}
                              title="Eliminar"
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                        {budget.estado === 'aceptado' && (
                          <IconButton
                            onClick={() => navigate(`/presupuestos/${budget._id}/pagos`)}
                            title="Gestionar pagos"
                            color="primary"
                          >
                            <PaymentIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Diálogo de confirmación para eliminar */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que desea eliminar el presupuesto del paciente{' '}
              {budgetToDelete?.paciente.nombrePaciente}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default BudgetList;