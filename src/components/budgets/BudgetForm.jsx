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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const BudgetForm = ({ 
  createBudget, 
  treatmentPlan,
  updateBudget, 
  fetchBudgetById, 
  fetchPatientByName,
  fetchPatientByCedula,
  calculateTotals, 
  treatmentPlanId,
  mode = 'create' 
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialFaseState = {
    nombre: '',
    descripcion: '',
    procedimientos: []
  };

  // Estados
  const [budget, setBudget] = useState({
    paciente: treatmentPlan?.paciente || '',
    especialidad: treatmentPlan?.especialidad || '',
    fases: [{
      nombre: 'Fase Inicial',
      descripcion: treatmentPlan?.actividadPlanTrat || '',
      procedimientos: []
    }]
  });

  
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const [newProcedimientos, setNewProcedimientos] = useState({});
  const [searchType, setSearchType] = useState('cedula');
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Lista de especialidades disponibles
  const especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Rehabilitación Oral',
    'Odontopediatría'
  ];

  // Efecto para cargar presupuesto en modo edición
  useEffect(() => {
    const loadBudget = async () => {
      if (mode === 'edit' && id) {
        try {
          console.log('BudgetForm - Loading budget with ID:', id);
          const result = await fetchBudgetById(id);
          
          if (!result.success) {
            throw new Error(result.error || 'Error al cargar el presupuesto');
          }
          
          setBudget({
            ...result.data,
            paciente: result.data.paciente.id || result.data.paciente
          });
          setSelectedPatient(result.data.paciente);
        } catch (error) {
          console.error('BudgetForm - Error loading budget:', error);
          toast.error(error.message || 'Error al cargar el presupuesto');
          navigate('/presupuestos');
        }
      }
    };
    
    loadBudget();
  }, [mode, id, fetchBudgetById, navigate]);

  useEffect(() => {
    if (treatmentPlan) {
      setBudget(prev => ({
        ...prev,
        paciente: treatmentPlan.paciente,
        especialidad: treatmentPlan.especialidad,
        treatmentPlan: treatmentPlan._id,
        fases: [{
          nombre: 'Fase Principal',
          descripcion: 'Basado en planificación',
          procedimientos: treatmentPlan.actividades.map(act => ({
            nombre: act.actividadPlanTrat,
            numeroPiezas: 1,
            costoPorUnidad: 0,
            costoTotal: 0
          }))
        }]
      }));
      setSelectedPatient(treatmentPlan.paciente);
      setSelectedActivities(treatmentPlan.actividades);
    }
  }, [treatmentPlan]);


  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Buscando paciente con:', { tipo: searchType, query: searchQuery });
      
      if (searchType === "cedula") {
        const result = await fetchPatientByCedula(searchQuery);
        console.log('Resultado búsqueda cédula:', result);
        if (result && result.data) {
          setPatients([result.data]);
          setSearched(true);
        }
      } else if (searchType === "nombre") {
        console.log('Iniciando búsqueda por nombre');
        const result = await fetchPatientByName(searchQuery);
        console.log('Resultado búsqueda nombre:', result);
        
        // Si result es directamente el array de pacientes
        if (Array.isArray(result)) {
          setPatients(result);
          setSearched(true);
        } 
        // Si result tiene una propiedad data que es el array
        else if (result && Array.isArray(result.data)) {
          setPatients(result.data);
          setSearched(true);
        }
        // Si es un solo paciente
        else if (result && !Array.isArray(result)) {
          setPatients([result]);
          setSearched(true);
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      toast.error("Error al buscar el paciente");
      setSearched(false);
    }
  };

  // Modificar handleAddProcedimiento
const handleAddProcedimiento = (faseIndex) => {
  const procedimiento = newProcedimientos[faseIndex] || {
    nombre: '',
    numeroPiezas: '',
    costoPorUnidad: ''
  };

  if (!procedimiento.nombre || !procedimiento.numeroPiezas || !procedimiento.costoPorUnidad) {
    toast.error('Todos los campos del procedimiento son requeridos');
    return;
  }

  const procedimientoToAdd = {
    ...procedimiento,
    numeroPiezas: parseInt(procedimiento.numeroPiezas),
    costoPorUnidad: parseFloat(procedimiento.costoPorUnidad),
    costoTotal: parseInt(procedimiento.numeroPiezas) * parseFloat(procedimiento.costoPorUnidad)
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

  // Limpiar solo el procedimiento de la fase actual
  setNewProcedimientos(prev => ({
    ...prev,
    [faseIndex]: {
      nombre: '',
      numeroPiezas: '',
      costoPorUnidad: ''
    }
  }));
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
        treatmentPlan: treatmentPlan?._id,
        fases,
        totalGeneral,
        estado: 'borrador',
        estadoPagoGeneral: 'pendiente' // Nuevo campo
      };

      const result = mode === 'edit'
        ? await updateBudget(id, budgetToSave)
        : await createBudget(budgetToSave);
      
      if (result.success) {
        toast.success(`Presupuesto ${mode === 'edit' ? 'actualizado' : 'creado'} exitosamente`);
        navigate('/presupuestos');
      } else {
        toast.error(`Error al ${mode === 'edit' ? 'actualizar' : 'crear'} el presupuesto`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error al ${mode === 'edit' ? 'actualizar' : 'crear'} el presupuesto`);
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', padding: '20px' }}>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/presupuestos")}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>

         {/* Diálogo de búsqueda de paciente */}
         {mode === 'create' && !treatmentPlan && (
          <Box component={Paper} style={{padding: '20px', marginBottom: '30px'}}> 
            <Box component="form" onSubmit={handleSearchSubmit}>
              <Typography variant="h5" gutterBottom>
                Paciente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Búsqueda</InputLabel>
                    <Select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      label="Tipo de Búsqueda"
                    >
                      <MenuItem value="cedula">Cédula</MenuItem>
                      <MenuItem value="nombre">Nombre</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label={searchType === "cedula" ? "Ingrese Cédula" : "Ingrese Nombre"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button type="submit" variant="contained">
                    Buscar Paciente
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {/* Nueva sección de actividades planificadas si existe treatmentPlan */}
      {treatmentPlan && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Actividades Planificadas
          </Typography>
          <List>
            {selectedActivities.map((actividad, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Cita ${actividad.cita}`}
                  secondary={
                    <>
                      <Typography>{actividad.actividadPlanTrat}</Typography>
                      <Typography variant="caption">
                        {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
                <Chip 
                  label={actividad.estado}
                  color={getStatusColor(actividad.estado)}
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      

        {/* Tabla de resultados */}
        {searched && patients.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant='h6'>Nombre</Typography></TableCell>
                  <TableCell><Typography variant='h6'>Cédula</Typography></TableCell>
                  <TableCell><Typography variant='h6'>Seleccionar</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.nombrePaciente}</TableCell>
                    <TableCell>{patient.numeroCedula}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setBudget(prev => ({ ...prev, paciente: patient.id }));
                        }}
                      >
                        Seleccionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedPatient && (
          <Box component={Paper} mt={2} p={2}>
            <Typography variant="subtitle1">
              <Typography variant='h6'><strong>Paciente seleccionado:</strong></Typography> {selectedPatient.nombrePaciente}
            </Typography>
            <br></br>
            <Typography variant="subtitle1">
              <Typography variant='h6'><strong>Cédula:</strong></Typography> {selectedPatient.numeroCedula}
            </Typography>
          </Box>
        )}

        <br></br>
        <hr></hr>
        <br></br>

        <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {mode === 'edit' ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
          {treatmentPlan && ' - Basado en Planificación'}
        </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>

             
              {/* Especialidad */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Especialidad</InputLabel>
                  <Select
                    value={budget.especialidad}
                    onChange={(e) => setBudget({ ...budget, especialidad: e.target.value })}
                    label="Especialidad"
                    required
                  >
                    {especialidades.map((esp) => (
                      <MenuItem key={esp} value={esp}>
                        {esp}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                              value={newProcedimientos[faseIndex]?.nombre || ''}
                              onChange={(e) => setNewProcedimientos(prev => ({
                                ...prev,
                                [faseIndex]: {
                                  ...prev[faseIndex],
                                  nombre: e.target.value
                                }
                              }))}
                              placeholder="Nombre del procedimiento"
                            />
                            </TableCell>
                            <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={newProcedimientos[faseIndex]?.numeroPiezas || ''}
                              onChange={(e) => setNewProcedimientos(prev => ({
                                ...prev,
                                [faseIndex]: {
                                  ...prev[faseIndex],
                                  numeroPiezas: e.target.value
                                }
                              }))}
                              placeholder="N° piezas"
                            />
                            </TableCell>
                            <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={newProcedimientos[faseIndex]?.costoPorUnidad || ''}
                              onChange={(e) => setNewProcedimientos(prev => ({
                                ...prev,
                                [faseIndex]: {
                                  ...prev[faseIndex],
                                  costoPorUnidad: e.target.value
                                }
                              }))}
                              placeholder="Costo"
                            />
                            </TableCell>
                            <TableCell>
                              {newProcedimientos[faseIndex]?.numeroPiezas && newProcedimientos[faseIndex]?.costoPorUnidad ? 
                                `$${(newProcedimientos[faseIndex].numeroPiezas * newProcedimientos[faseIndex].costoPorUnidad).toFixed(2)}` : 
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
                  {mode === 'edit' ? 'Actualizar Presupuesto' : 'Guardar Presupuesto'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

       

      </Container>
    </div>
  );
};

export default BudgetForm;