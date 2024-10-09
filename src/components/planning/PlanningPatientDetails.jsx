import React, { useEffect, useState } from "react";
import "../patients/Patients.css";
import { usePatients } from "../../hooks/usePatients";
import { useNavigate } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";

const PlanningPatientList = () => {
  const { patients, fetchPatients, fetchPatientByCedula, fetchPatientByName, setPatient } = usePatients();

  useEffect(() => {
    fetchPatients(); // Cargar la lista de pacientes al inicio
  }, []);

  const navigate = useNavigate();

  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchType, setSearchType] = useState("cedula");
  const [searchName, setSearchName] = useState("");
  const [searchCedula, setSearchCedula] = useState("");

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchCedulaChange = (e) => {
    setSearchCedula(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchType === "name" && searchName) {
      try {
        await fetchPatientByName(searchName);
        toast.success("Paciente encontrado exitosamente", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Error al buscar el paciente.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      setSearchName("");
    } else if (searchType === "cedula" && searchCedula) {
      try {
        await fetchPatientByCedula(searchCedula);
        toast.success("Paciente encontrado exitosamente", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Error al buscar el paciente.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      setSearchCedula("");
    }
  };

  const handleViewPatient = (patient) => {
    navigate(`/treatment-plans/${patient.id}`, { state: { patient } });
    setShowSearchForm(false);
  };

  const handleReset = () => {
    setSearchCedula(""); // Restablecer los valores de búsqueda
    setSearchName("");
    setPatient(null); // Quitar cualquier paciente seleccionado
    setShowSearchForm(false); // Ocultar el formulario de búsqueda
    fetchPatients(); // Recargar la lista de pacientes
  };

  return (
    <div className="Patients">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/planificacion")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
      <Container>
        <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: 4 }}>
          Pacientes
        </Typography>
      </Container>
      <Container>
        <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => {
                setShowSearchForm(!showSearchForm);
                setSearchCedula("");
                setSearchName("");
                setPatient(null);
                fetchPatients();
              }}
            >
              {showSearchForm ? "Ocultar Buscar Paciente" : "Buscar Paciente"}
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Formulario de búsqueda */}
      {showSearchForm && (
        <Box component="form" onSubmit={handleSearchSubmit} sx={{ mt: 2, mb: 4 }}>
          <Container component={Paper} sx={{ py: 1 }}>
            <Typography variant="h6" align="center" gutterBottom sx={{ marginBottom: 4 }}>
              Buscar Paciente
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Búsqueda</InputLabel>
                  <Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    label="Tipo de Búsqueda"
                  >
                    <MenuItem value="cedula">Cédula</MenuItem>
                    <MenuItem value="name">Nombre</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {searchType === "cedula" ? (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Ingrese Número de Cédula del paciente"
                    value={searchCedula}
                    onChange={handleSearchCedulaChange}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Ingrese Nombre del paciente"
                    value={searchName}
                    onChange={handleSearchNameChange}
                  />
                </Grid>
              )}
              <Grid item xs={12} container justifyContent="center" gap={4}>
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ m: 2 }}
                    startIcon={<SearchIcon />}
                    fullWidth
                  >
                    Buscar
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="secondary" sx={{ m: 2 }} fullWidth onClick={handleReset}>
                    Restablecer
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Lista de pacientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><Typography variant="h6">Nombre</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Edad</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Fecha de Nacimiento</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Correo</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Dirección</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Género</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Número de Cédula</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Ocupación</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Teléfono</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Tel. Emergencia</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Afinidad Emergencia</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">Planificación</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell align="center">{patient.nombrePaciente}</TableCell>
                <TableCell align="center">{patient.edadPaciente}</TableCell>
                <TableCell align="center">{patient.fechaNacimiento.split("T")[0]}</TableCell>
                <TableCell align="center">{patient.correoPaciente}</TableCell>
                <TableCell align="center">{patient.direccionPaciente}</TableCell>
                <TableCell align="center">{patient.generoPaciente}</TableCell>
                <TableCell align="center">{patient.numeroCedula}</TableCell>
                <TableCell align="center">{patient.ocupacion}</TableCell>
                <TableCell align="center">{patient.telefono}</TableCell>
                <TableCell align="center">{patient.telContactoEmergencia}</TableCell>
                <TableCell align="center">{patient.afinidadContactoEmergencia}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleViewPatient(patient)}>
                    <VisibilityIcon />
                  </IconButton>
                  Ver
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlanningPatientList;
