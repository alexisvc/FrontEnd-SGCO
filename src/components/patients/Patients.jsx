import React, { useState } from 'react';
import { usePatients } from '../../hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import PatientForm from './PatientForm';
import { Button, 
  Typography, 
  Grid, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  TextField, 
  Container, 
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Patients = ({ user, patients, patient, loading, error, fetchPatientById, fetchPatientByCedula, createPatient }) => {
  const navigate = useNavigate();
  //const { patients, patient, loading, error, fetchPatientById, fetchPatientByCedula, createPatient, updatePatient } = usePatients();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchCedula, setSearchCedula] = useState('');
  const [newPatient, setNewPatient] = useState({
    nombrePaciente: '',
    edadPaciente: '',
    fechaNacimiento: '',
    correoPaciente: '',
    direccionPaciente: '',
    generoPaciente: '',
    numeroCedula: '',
    ocupacion: '',
    telefono: '',
    telContactoEmergencia: '',
    afinidadContactoEmergencia: ''
  });

  const handleSearchIdChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchCedulaChange = (e) => {
    setSearchCedula(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId) {
      fetchPatientById(searchId);
    } else if (searchCedula) {
      fetchPatientByCedula(searchCedula);
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createPatient(newPatient);
    setNewPatient({
      nombrePaciente: '',
      edadPaciente: '',
      fechaNacimiento: '',
      correoPaciente: '',
      direccionPaciente: '',
      generoPaciente: '',
      numeroCedula: '',
      ocupacion: '',
      telefono: '',
      telContactoEmergencia: '',
      afinidadContactoEmergencia: ''
    });
    setShowCreateForm(false);
  };

  const handleViewPatient = (patient) => {
    navigate(`/prueba/${patient.id}`, { state: { patient } });
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/main-menu")}
      >
        Atrás
      </Button>
      <Typography variant="h3" align="center" gutterBottom sx = {{ marginTop: 5, marginBottom: 4}}>
        Pacientes
      </Typography>
      
      <Grid container spacing={2} justifyContent="center" sx = {{ marginBottom: 4 }}>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Ocultar Crear Paciente' : 'Crear Paciente'}
          </Button>
        </Grid>
        <Grid item> 
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => setShowSearchForm(!showSearchForm)}
          >
            {showSearchForm ? 'Ocultar Buscar Paciente' : 'Buscar Paciente'}
          </Button>
        </Grid>
      </Grid>

      {showCreateForm && (
        <PatientForm 
          newPatient={newPatient} 
          handleCreateChange={handleCreateChange} 
          handleCreateSubmit={handleCreateSubmit} 
        />
      )}
      {showSearchForm && (
        <div>
          <Typography variant="h6" align="center" gutterBottom sx = {{ marginTop: 5, marginBottom: 4}}>
            Buscar Paciente
          </Typography>

          <Container component="form" onSubmit={handleSearchSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Ingrese ID del paciente"
                  value={searchId}
                  onChange={handleSearchIdChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Ingrese Número de Cédula del paciente"
                  value={searchCedula}
                  onChange={handleSearchCedulaChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  fullWidth
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Container>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {patient && (
            <div>
              <h3>Detalles del Paciente</h3>
              <p>Nombre: {patient.nombrePaciente}</p>
              <p>Edad: {patient.edadPaciente}</p>
              <p>Fecha de Nacimiento: {patient.fechaNacimiento}</p>
              <p>Correo: {patient.correoPaciente}</p>
              <p>Dirección: {patient.direccionPaciente}</p>
              <p>Género: {patient.generoPaciente}</p>
              <p>Número de Cédula: {patient.numeroCedula}</p>
              <p>Ocupación: {patient.ocupacion}</p>
              <p>Teléfono: {patient.telefono}</p>
              <p>Teléfono de Contacto de Emergencia: {patient.telContactoEmergencia}</p>
              <p>Afinidad de Contacto de Emergencia: {patient.afinidadContactoEmergencia}</p>
            </div>
          )}
        </div>
      )}
      <div>
      <Typography variant="h5" align="center" gutterBottom sx = {{ marginTop: 5, marginBottom: 4}}>
        Lista de Pacientes
      </Typography>
        
      <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='center'><Typography variant='h6'>Nombre </Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Edad</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Fecha de Nacimiento</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Correo</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Dirección</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Género</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Número de Cédula</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Ocupación</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Teléfono</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Tel. Emergencia</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Afinidad Emergencia</Typography></TableCell>
          <TableCell align='center'><Typography variant='h6'>Historia Clínica</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell align='center'>{patient.nombrePaciente}</TableCell>
            <TableCell align='center'>{patient.edadPaciente}</TableCell>
            <TableCell align='center'>{patient.fechaNacimiento}</TableCell>
            <TableCell align='center'>{patient.correoPaciente}</TableCell>
            <TableCell align='center'>{patient.direccionPaciente}</TableCell>
            <TableCell align='center'>{patient.generoPaciente}</TableCell>
            <TableCell align='center'>{patient.numeroCedula}</TableCell>
            <TableCell align='center'>{patient.ocupacion}</TableCell>
            <TableCell align='center'>{patient.telefono}</TableCell>
            <TableCell align='center'>{patient.telContactoEmergencia}</TableCell>
            <TableCell align='center'>{patient.afinidadContactoEmergencia}</TableCell>
            <TableCell align='center'>
              <IconButton onClick={() => handleViewPatient(patient)}>
                <VisibilityIcon />
                Ver HC
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
      </div>
    </div>
  );
};

export default Patients;
