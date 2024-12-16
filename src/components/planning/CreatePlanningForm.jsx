import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ArrowBack } from '@mui/icons-material';
import { usePatients } from '../../hooks/usePatients';
import { toast } from 'react-toastify';
import patientTreatmentService from '../../services/patientTreatmentService';

const CreatePlanningForm = ({ mode = 'create', onSubmit}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchPatientByCedula, fetchPatientByName } = usePatients();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        especialidad: '',
        actividades: [{
            cita: '',
            actividadPlanTrat: '',
            fechaPlanTrat: '',
            montoAbono: '',
            estado: 'pendiente'
        }]
    });



  const especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Rehabilitación Oral',
    'Odontopediatría',

  ];

  

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (mode === 'edit' && id) {
      const loadTreatment = async () => {
        setLoading(true);
        try {
          const treatment = await patientTreatmentService.getById(id);
          setFormData({
            especialidad: treatment.especialidad,
            actividades: treatment.actividades.map(act => ({
              cita: act.cita,
              actividadPlanTrat: act.actividadPlanTrat,
              fechaPlanTrat: act.fechaPlanTrat.split('T')[0],
              montoAbono: act.montoAbono || '',
              estado: act.estado || 'pendiente'
            }))
          });
          
          // Asegurarnos de que el paciente tenga un ID válido
          const patientData = {
            ...treatment.paciente,
            _id: treatment.paciente._id || treatment.paciente.id
          };
          setSelectedPatient(patientData);
          
          console.log('Loaded patient data:', patientData); // Debug
        } catch (error) {
          console.error('Error loading treatment:', error);
          toast.error('Error al cargar la planificación');
          navigate('/planificacion');
        } finally {
          setLoading(false);
        }
      };
      loadTreatment();
    }
  }, [mode, id]);

  

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      actividades: [...prev.actividades, {
        cita: '',
        actividadPlanTrat: '',
        fechaPlanTrat: '',
        montoAbono: '',
        estado: 'pendiente'
      }]
    }));
  };

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchType, setSearchType] = useState("cedula");
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (searchType === "cedula") {
        result = await fetchPatientByCedula(searchQuery);
        if (result.success) {
          setPatients([result.data]);
          setSearched(true);
        }
      } else {
        result = await fetchPatientByName(searchQuery);
        if (result.success) {
          setPatients(Array.isArray(result.data) ? result.data : [result.data]);
          setSearched(true);
        }
      }
    } catch (error) {
      toast.error("Error al buscar el paciente");
      setSearched(false);
    }
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      actividades: prev.actividades.filter((_, i) => i !== index)
    }));
  };

  const updateActivity = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      actividades: prev.actividades.map((act, i) => 
        i === index ? { ...act, [field]: value } : act
      )
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const patientId = selectedPatient?._id || selectedPatient?.id;
    
    if (!patientId) {
      console.error('No patient ID found:', selectedPatient);
      toast.error('Error: ID de paciente no encontrado');
      return;
    }
  
    const treatmentData = {
      paciente: patientId, // Usar el ID extraído
      especialidad: formData.especialidad,
      actividades: formData.actividades.map(act => ({
        cita: act.cita,
        actividadPlanTrat: act.actividadPlanTrat,
        fechaPlanTrat: new Date(act.fechaPlanTrat).toISOString(),
        montoAbono: parseFloat(act.montoAbono) || 0,
        estado: act.estado || 'pendiente'
      }))
    };
  
    console.log('Treatment data to submit:', treatmentData); // Debug
  
    try {
      if (mode === 'edit') {
        await onSubmit(id, treatmentData);
      } else {
        await onSubmit(treatmentData);
      }
      toast.success(`Planificación ${mode === 'edit' ? 'actualizada' : 'creada'} exitosamente`);
      navigate('/planificacion');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.error || `Error al ${mode === 'edit' ? 'actualizar' : 'crear'} la planificación`);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
        <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/planificacion')}
        >
          Volver
        </Button>
      </Box>

      

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {mode === 'edit' ? 'Editar Planificación' : 'Nueva Planificación'}
        </Typography>

        {/* Búsqueda de Paciente */}
        {/* Búsqueda de Paciente */}
{mode === 'create' && (
  <Box component={Paper} style={{padding: '20px', marginBottom: '30px'}}> 
    <Box component="form" onSubmit={handleSearchSubmit}>  {/* Añadir onSubmit aquí */}
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

            {searched && patients.length > 0 && (
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
          <TableCell><Typography variant="h6">Cédula</Typography></TableCell>
          <TableCell><Typography variant="h6">Seleccionar</Typography></TableCell>
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
                  setFormData(prev => ({
                    ...prev,
                    paciente: patient.id || patient._id
                  }));
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
              <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
                <Typography><strong>Paciente:</strong> {selectedPatient.nombrePaciente}</Typography>
                <Typography><strong>Cédula:</strong> {selectedPatient.numeroCedula}</Typography>
              </Box>
            )}
          </Box>
        )}

        

        {/* Formulario Principal */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Especialidad</InputLabel>
                <Select
                  value={formData.especialidad}
                  onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                >
                  {especialidades.map(esp => (
                    <MenuItem key={esp} value={esp}>{esp}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Lista de Actividades */}
            {formData.actividades.map((actividad, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={1} sx={{ p: 2, position: 'relative' }}>
                  <IconButton
                    size="small"
                    onClick={() => removeActivity(index)}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Cita"
                        value={actividad.cita}
                        onChange={(e) => updateActivity(index, 'cita', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        type="date"
                        label="Fecha"
                        value={actividad.fechaPlanTrat}
                        onChange={(e) => updateActivity(index, 'fechaPlanTrat', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        multiline
                        rows={3}
                        label="Actividad"
                        value={actividad.actividadPlanTrat}
                        onChange={(e) => updateActivity(index, 'actividadPlanTrat', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Monto Abono"
                        value={actividad.montoAbono}
                        onChange={(e) => updateActivity(index, 'montoAbono', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addActivity}
              >
                Agregar Actividad
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!selectedPatient || !formData.especialidad || formData.actividades.length === 0}
              >
                {mode === 'edit' ? 'Actualizar' : 'Crear'} Planificación
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePlanningForm;