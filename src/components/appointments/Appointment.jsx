import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Container,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useAppointments } from "../../hooks/useAppointment";
import { usePatients } from "../../hooks/usePatients"; // Hook para buscar pacientes
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import dayjs from "dayjs"; // Para obtener la fecha de hoy

const Appointment = () => {
  const { odontologoId } = useParams(); // Obtener el id del odontólogo desde la URL
  const { appointments, fetchAppointmentsByOdontologo, createAppointment, deleteAppointment } = useAppointments();
  const { fetchPatientByCedula, fetchPatientByName, patients } = usePatients(); // Hook para manejar la búsqueda de pacientes

  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Campo de búsqueda para el paciente
  const [searchType, setSearchType] = useState("cedula"); // Tipo de búsqueda (nombre o cédula)
  const [searched, setSearched] = useState(false); // Nuevo estado para rastrear si se hizo una búsqueda
  const [newAppointment, setNewAppointment] = useState({
    paciente: "",
    fecha: "",
    hora: "",
  });

  const [availableHours, setAvailableHours] = useState([]); // Para guardar las horas disponibles
  const today = dayjs().format("YYYY-MM-DD"); // Obtener la fecha de hoy

  useEffect(() => {
    fetchAppointmentsByOdontologo(odontologoId); // Obtener citas del odontólogo
  }, [odontologoId]);

  // Generar las horas disponibles de 7 AM a 8:30 PM en intervalos de 15 minutos
  const generateAvailableHours = () => {
    const startTime = dayjs().hour(7).minute(0);
    const endTime = dayjs().hour(20).minute(30);
    const hours = [];
    let time = startTime;

    while (time.isBefore(endTime) || time.isSame(endTime)) {
      hours.push(time.format("HH:mm"));
      time = time.add(15, "minute");
    }

    return hours;
  };

  // Filtrar las horas ocupadas basadas en la fecha seleccionada
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setNewAppointment({ ...newAppointment, fecha: selectedDate });

    // Filtrar las horas ocupadas en la fecha seleccionada
    const occupiedHours = appointments
      .filter((appointment) => appointment.fecha.split("T")[0] === selectedDate)
      .map((appointment) => appointment.hora);

    console.log("Horas ocupadas:", occupiedHours);

    // Generar todas las horas y filtrar las que están ocupadas
    const allHours = generateAvailableHours();
    const available = allHours.filter((hour) => !occupiedHours.includes(hour)); // Filtrar horas disponibles
    setAvailableHours(available);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchType === "cedula") {
        await fetchPatientByCedula(searchQuery); // Búsqueda por cédula
      } else if (searchType === "name") {
        await fetchPatientByName(searchQuery); // Búsqueda por nombre
      }
      setSearched(true); // Establecer que se ha hecho una búsqueda
      setAvailableHours([]); // Limpiar las horas disponibles
    } catch (error) {
      toast.error("Error al buscar el paciente", { autoClose: 3000 });
      setSearched(false); // Restablecer el estado de búsqueda
      setAvailableHours([]); // Limpiar las horas disponibles
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (!selectedPatient) {
      toast.error("Debes seleccionar un paciente", { autoClose: 3000 });
      return;
    }

    try {
      await createAppointment({
        ...newAppointment,
        paciente: selectedPatient,
        odontologo: odontologoId,
      });
      toast.success("Cita creada exitosamente", { autoClose: 3000 });
      setNewAppointment({ paciente: "", fecha: "", hora: "" });
      fetchAppointmentsByOdontologo(odontologoId);
      setSearchQuery(""); // Limpiar el campo de búsqueda
      setSearched(false); // Restablecer el estado de búsqueda
      setSelectedPatient(null); // Restablecer el paciente seleccionado
    } catch (error) {
      toast.error("Error al crear la cita", { autoClose: 3000 });
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      toast.success("Cita eliminada", { autoClose: 3000 });
      fetchAppointmentsByOdontologo(odontologoId);
    } catch (error) {
      toast.error("Error al eliminar la cita", { autoClose: 3000 });
    }
  };

  return (
    <Container>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/odontologos")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Agendar Citas
      </Typography>

      {/* Formulario de búsqueda de paciente */}
      <Box component="form" onSubmit={handleSearchSubmit}>
        <Typography variant="h6" gutterBottom>
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={searchType === "cedula" ? "Ingrese Cédula" : "Ingrese Nombre"}
              name="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" fullWidth>
              Buscar Paciente
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Mostrar tabla de pacientes solo si hay resultados y se ha hecho una búsqueda */}
      {searched && patients.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Seleccionar</TableCell>
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
                      onClick={() => setSelectedPatient(patient.id)}
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

      {/* Solo mostrar formulario de cita si se ha seleccionado un paciente */}
      {selectedPatient && (
        <Box component="form" onSubmit={handleCreateAppointment} sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Crear Nueva Cita para el Paciente Seleccionado
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha"
                name="fecha"
                InputLabelProps={{ shrink: true }}
                value={newAppointment.fecha}
                onChange={handleDateChange}
                required
                inputProps={{
                  min: today, // Bloquear fechas anteriores a hoy
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Horas Disponibles
              </Typography>
              <Grid container spacing={2}>
                {availableHours.map((hour, index) => (
                  <Grid item xs={1.5} key={index}>
                    <FormControlLabel
                      value={hour}
                      control={<Radio />}
                      label={hour}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, hora: e.target.value })
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Agendar Cita
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Listado de citas del odontólogo */}
      <Typography variant="h6" align="center" gutterBottom>
        Citas del Odontólogo
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paciente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.paciente.nombrePaciente}</TableCell>
                <TableCell>{appointment.fecha.split("T")[0]}</TableCell>
                <TableCell>{appointment.hora}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Appointment;
