import React, { useState } from "react";
import { usePatients } from "../../hooks/usePatients";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import PatientForm from "./PatientForm";
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
  IconButton,
  TextField,
  Container,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";

const Patients = ({
  patients,
  patient,
  fetchPatientById,
  fetchPatientByCedula,
  createPatient,
  setPatient
}) => {
  const navigate = useNavigate();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchCedula, setSearchCedula] = useState("");
  const [newPatient, setNewPatient] = useState({
    nombrePaciente: "",
    edadPaciente: "",
    fechaNacimiento: "",
    correoPaciente: "",
    direccionPaciente: "",
    generoPaciente: "",
    numeroCedula: "",
    ocupacion: "",
    telefono: "",
    telContactoEmergencia: "",
    afinidadContactoEmergencia: "",
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

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await createPatient(newPatient);
      // Notificación de éxito
      toast.success("Paciente creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
  
      // Limpiar los campos del formulario
      setNewPatient({
        nombrePaciente: "",
        edadPaciente: "",
        fechaNacimiento: "",
        correoPaciente: "",
        direccionPaciente: "",
        generoPaciente: "",
        numeroCedula: "",
        ocupacion: "",
        telefono: "",
        telContactoEmergencia: "",
        afinidadContactoEmergencia: "",
      });
  
      setShowCreateForm(false);
    } catch (error) {
      // Notificación de error
      toast.error("Error al crear el paciente.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  const handleViewPatient = (patient) => {
    navigate(`/patients/${patient.id}`, { state: { patient } });
    setShowSearchForm(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/main-menu")}
      >
        Atrás
      </Button>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ marginTop: 5, marginBottom: 4 }}
      >
        Pacientes
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 4 }}
      >
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            onClick={() => {
              setShowCreateForm(!showCreateForm);
              setShowSearchForm(false);
            }}
          >
            {showCreateForm ? "Ocultar Crear Paciente" : "Crear Paciente"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => {
              setShowSearchForm(!showSearchForm);
              setShowCreateForm(false);
              setSearchCedula("");            
              setPatient(null);
            }}
          >
            {showSearchForm ? "Ocultar Buscar Paciente" : "Buscar Paciente"}
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
        <>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ marginTop: 5, marginBottom: 4 }}
          >
            Buscar Paciente
          </Typography>

          <Container
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Ingrese Número de Cédula del paciente"
                  value={searchCedula}
                  onChange={handleSearchCedulaChange}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Grid item xs={2}>
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
            </Grid>
          </Container>

          {patient && (
            <Container>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{ margin: 5 }}
              >
                Detalles del Paciente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Paciente"
                    name="nombrePaciente"
                    value={patient.nombrePaciente}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Edad del Paciente"
                    name="edadPaciente"
                    value={patient.edadPaciente}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    value={patient.fechaNacimiento.split("T")[0]}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Correo electrónico"
                    name="correoPaciente"
                    value={patient.correoPaciente}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="direccionPaciente"
                    value={patient.direccionPaciente}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Género"
                    name="generoPaciente"
                    value={patient.generoPaciente}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Número de Cédula"
                    name="numeroCedula"
                    value={patient.numeroCedula}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ocupación"
                    name="ocupacion"
                    value={patient.ocupacion}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={patient.telefono}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono de Contacto de Emergencia"
                    name="telContactoEmergencia"
                    value={patient.telContactoEmergencia}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Afinidad de Contacto de Emergencia"
                    name="afinidadContactoEmergencia"
                    value={patient.afinidadContactoEmergencia}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleViewPatient(patient)}
                      variant="contained"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      fullWidth
                    >
                      Ver HC
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          )}
        </>
      )}

      <>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ marginTop: 5, marginBottom: 4 }}
        >
          Lista de Pacientes
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Nombre </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Edad</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Fecha de Nacimiento</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Correo</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Dirección</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Género</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Número de Cédula</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Ocupación</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Teléfono</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Tel. Emergencia</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Afinidad Emergencia</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Historia Clínica</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell align="center">{patient.nombrePaciente}</TableCell>
                  <TableCell align="center">{patient.edadPaciente}</TableCell>
                  <TableCell align="center">
                    {patient.fechaNacimiento.split("T")[0]}
                  </TableCell>
                  <TableCell align="center">{patient.correoPaciente}</TableCell>
                  <TableCell align="center">
                    {patient.direccionPaciente}
                  </TableCell>
                  <TableCell align="center">{patient.generoPaciente}</TableCell>
                  <TableCell align="center">{patient.numeroCedula}</TableCell>
                  <TableCell align="center">{patient.ocupacion}</TableCell>
                  <TableCell align="center">{patient.telefono}</TableCell>
                  <TableCell align="center">
                    {patient.telContactoEmergencia}
                  </TableCell>
                  <TableCell align="center">
                    {patient.afinidadContactoEmergencia}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewPatient(patient)}>
                      <VisibilityIcon />
                    </IconButton>
                    Ver HC
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
};

export default Patients;
