import React, { useEffect, useState } from "react";
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
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppointments } from "../../hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AppointmentDetails = () => {
  const { appointments, fetchAppointments, deleteAppointment } = useAppointments();
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState("patient"); // Búsqueda por paciente u odontólogo
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      await fetchAppointments();
    };

    loadAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      // Ordenar por fecha y hora descendente
      const sortedAppointments = [...appointments].sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB - dateA; // Orden descendente
      });
      setFilteredAppointments(sortedAppointments);
    }
  }, [appointments]);

  // Filtrar citas por el nombre del paciente u odontólogo
  const handleSearch = () => {
    let filtered = [];

    if (searchType === "patient") {
      filtered = appointments.filter((appointment) =>
        appointment.paciente.nombrePaciente
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    } else if (searchType === "odontologo") {
      filtered = appointments.filter((appointment) =>
        appointment.odontologo.nombreOdontologo
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (filtered.length === 0) {
      toast.error("No existen citas", { autoClose: 3000 });
    } else {
      // Ordenar los resultados filtrados
      const sortedFiltered = [...filtered].sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB - dateA; // Orden descendente
      });
      setFilteredAppointments(sortedFiltered);
    }
  };

  // Manejar la eliminación de una cita
  const handleDelete = async (appointmentId) => {
    if (window.confirm("¿Estás seguro de eliminar esta cita?")) {
      try {
        await deleteAppointment(appointmentId);
        toast.success("Cita eliminada exitosamente", { autoClose: 3000 });
        // Actualizar la lista de citas
        setFilteredAppointments(
          filteredAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
      } catch (error) {
        toast.error("Error al eliminar la cita", { autoClose: 3000 });
      }
    }
  };

  return (
    <Container>
      {/* Botón de atrás */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/agendamiento")}
        sx={{ mb: 2 }}
      >
        Atrás
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Lista de Citas
      </Typography>
      {/* Botón para agendar nueva cita */}
      <Grid container justifyContent="center" sx={{ mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/agendamiento/cita")}
        >
          Agendar Nueva Cita
        </Button>
      </Grid>

      {/* Formulario de búsqueda */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Buscar por</InputLabel>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              label="Buscar por"
            >
              <MenuItem value="patient">Paciente</MenuItem>
              <MenuItem value="odontologo">Odontólogo</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={
              searchType === "patient"
                ? "Ingrese el nombre del paciente"
                : "Ingrese el nombre del odontólogo"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            Buscar
          </Button>
        </Grid>
      </Grid>

      {/* Tabla de citas filtradas */}
      {filteredAppointments.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Odontólogo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.paciente.nombrePaciente}</TableCell>
                  <TableCell>{appointment.odontologo.nombreOdontologo}</TableCell>
                  <TableCell>{appointment.fecha.split("T")[0]}</TableCell>
                  <TableCell>{appointment.hora}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AppointmentDetails;
