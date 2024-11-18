import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Container,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useBudgets } from '../../hooks/useBudgets';
import { usePatients } from '../../hooks/usePatients';

const BudgetForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createBudget, calculateTotals } = useBudgets();
  const { patients, fetchPatientByCedula } = usePatients();
  
  const initialFaseState = {
    nombre: '',
    descripcion: '',
    procedimientos: []
  };

  const [budget, setBudget] = useState({
    paciente: '',
    especialidad: '',
    fases: [{ ...initialFaseState }]
  });

  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [currentFaseIndex, setCurrentFaseIndex] = useState(0);
  const [newProcedimiento, setNewProcedimiento] = useState({
    nombre: '',
    numeroPiezas: '',
    costoPorUnidad: ''
  });

  const handlePatientSearch = async () => {
    try {
      const result = await fetchPatientByCedula(patientSearch);
      
      if (result.success) {
        setSelectedPatient(result.data);
        setBudget(prev => ({ ...prev, paciente: result.data.id }));
        setShowSearchDialog(false);
        toast.success('Paciente encontrado');
      } else {
        toast.error('Paciente no encontrado');
      }
    } catch (error) {
      toast.error('Error al buscar el paciente');
    }
  };

  const handleAddProcedimiento = (faseIndex) => {
    if (!newProcedimiento.nombre || !newProcedimiento.numeroPiezas || !newProcedimiento.costoPorUnidad) {
      toast.error('Todos los campos del procedimiento son requeridos');
      return;
    }

    const procedimientoToAdd = {
      ...newProcedimiento,
      numeroPiezas: parseInt(newProcedimiento.numeroPiezas),
      costoPorUnidad: parseFloat(newProcedimiento.costoPorUnidad),
      costoTotal: parseInt(newProcedimiento.numeroPiezas) * parseFloat(newProcedimiento.costoPorUnidad)
    };

    setBudget(prevBudget => {
      const newFases = [...prevBudget.fases];
      newFases[faseIndex] = {
        ...newFases[faseIndex],
        procedimientos: [...newFases[faseIndex].procedimientos, procedimientoToAdd]
      };
      return {
        ...prevBudget,
        fases: newFases
      };
    });

    // Resetear el formulario de nuevo procedimiento
    setNewProcedimiento({
      nombre: '',
      numeroPiezas: '',
      costoPorUnidad: ''
    });
  };

  const handleDeleteProcedimiento = (faseIndex, procIndex) => {
    setBudget(prevBudget => {
      const newFases = [...prevBudget.fases];
      newFases[faseIndex].procedimientos.splice(procIndex, 1);
      return {
        ...prevBudget,
        fases: newFases
      };
    });
  };

  const handleAddFase = () => {
    setBudget(prevBudget => ({
      ...prevBudget,
      fases: [...prevBudget.fases, { ...initialFaseState }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!budget.paciente || !budget.especialidad) {
      toast.error('Paciente y especialidad son requeridos');
      return;
    }

    // Verificar que cada fase tenga al menos un procedimiento
    const hasEmptyFases = budget.fases.some(fase => 
      !fase.nombre || !fase.descripcion || fase.procedimientos.length === 0
    );

    if (hasEmptyFases) {
      toast.error('Todas las fases deben tener nombre, descripción y al menos un procedimiento');
      return;
    }

    try {
      const { fases, totalGeneral } = calculateTotals(budget.fases);
      const budgetToSave = {
        ...budget,
        fases,
        totalGeneral
      };

      const result = await createBudget(budgetToSave);
      
      if (result.success) {
        toast.success('Presupuesto creado exitosamente');
        navigate('/presupuestos');
      } else {
        toast.error('Error al crear el presupuesto');
      }
    } catch (error) {
      console.error('Error al crear presupuesto:', error);
      toast.error('Error al crear el presupuesto');
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Atrás
        </Button>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {id ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Sección de Paciente */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => setShowSearchDialog(true)}
                  disabled={!!selectedPatient}
                >
                  Buscar Paciente
                </Button>
                {selectedPatient && (
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      Paciente: {selectedPatient.nombrePaciente}
                    </Typography>
                    <Typography variant="subtitle2">
                      Cédula: {selectedPatient.numeroCedula}
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Especialidad */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Especialidad"
                  value={budget.especialidad}
                  onChange={(e) => setBudget({ ...budget, especialidad: e.target.value })}
                  required
                />
              </Grid>

              {/* Fases */}
              {budget.fases.map((fase, faseIndex) => (
                <Grid item xs={12} key={faseIndex}>
                  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Fase {faseIndex + 1}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nombre de la fase"
                          value={fase.nombre}
                          onChange={(e) => {
                            const newFases = [...budget.fases];
                            newFases[faseIndex].nombre = e.target.value;
                            setBudget({ ...budget, fases: newFases });
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Descripción"
                          value={fase.descripcion}
                          onChange={(e) => {
                            const newFases = [...budget.fases];
                            newFases[faseIndex].descripcion = e.target.value;
                            setBudget({ ...budget, fases: newFases });
                          }}
                          required
                        />
                      </Grid>
                    </Grid>

                    {/* Tabla de Procedimientos */}
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Procedimiento</TableCell>
                            <TableCell>N° de piezas</TableCell>
                            <TableCell>Costo por unidad</TableCell>
                            <TableCell>Costo total</TableCell>
                            <TableCell>Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fase.procedimientos.map((proc, procIndex) => (
                            <TableRow key={procIndex}>
                              <TableCell>{proc.nombre}</TableCell>
                              <TableCell>{proc.numeroPiezas}</TableCell>
                              <TableCell>${proc.costoPorUnidad}</TableCell>
                              <TableCell>${proc.costoTotal}</TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={() => handleDeleteProcedimiento(faseIndex, procIndex)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          {/* Fila para agregar nuevo procedimiento */}
                          <TableRow>
                            <TableCell>
                              <TextField
                                fullWidth
                                size="small"
                                value={newProcedimiento.nombre}
                                onChange={(e) => setNewProcedimiento({
                                  ...newProcedimiento,
                                  nombre: e.target.value
                                })}
                                placeholder="Nombre del procedimiento"
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={newProcedimiento.numeroPiezas}
                                onChange={(e) => setNewProcedimiento({
                                  ...newProcedimiento,
                                  numeroPiezas: e.target.value
                                })}
                                placeholder="N° piezas"
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={newProcedimiento.costoPorUnidad}
                                onChange={(e) => setNewProcedimiento({
                                  ...newProcedimiento,
                                  costoPorUnidad: e.target.value
                                })}
                                placeholder="Costo"
                              />
                            </TableCell>
                            <TableCell>
                              {newProcedimiento.numeroPiezas && newProcedimiento.costoPorUnidad ? 
                                `$${(newProcedimiento.numeroPiezas * newProcedimiento.costoPorUnidad).toFixed(2)}` : 
                                '-'
                              }
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleAddProcedimiento(faseIndex)}
                              >
                                Agregar
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              ))}

              {/* Botón para agregar nueva fase */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddFase}
                >
                  Agregar Fase
                </Button>
              </Grid>

              {/* Botón de guardar */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Guardar Presupuesto
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Diálogo de búsqueda de paciente */}
        <Dialog open={showSearchDialog} onClose={() => setShowSearchDialog(false)}>
          <DialogTitle>Buscar Paciente</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Número de Cédula"
              fullWidth
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSearchDialog(false)}>Cancelar</Button>
            <Button onClick={handlePatientSearch}>Buscar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default BudgetForm;