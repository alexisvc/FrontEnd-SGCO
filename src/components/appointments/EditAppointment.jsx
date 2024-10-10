import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAppointments } from "../../hooks/useAppointment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditAppointment = () => {
  const { appointmentId } = useParams(); // Obtener el id de la cita desde la URL
  const { fetchAppointmentById, updateAppointment } = useAppointments();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    paciente: "",
    odontologo: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
  });

  const [newDate, setNewDate] = useState(null);
  const [newTimeStart, setNewTimeStart] = useState("");
  const [newTimeEnd, setNewTimeEnd] = useState("");

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const fetchedAppointment = await fetchAppointmentById(appointmentId);
        setAppointment(fetchedAppointment);
        setNewDate(dayjs(fetchedAppointment.fecha));
        setNewTimeStart(fetchedAppointment.horaInicio);
        setNewTimeEnd(fetchedAppointment.horaFin);
      } catch (error) {
        toast.error("Error al cargar la cita");
      }
    };
    loadAppointment();
  }, [appointmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newDate);
      await updateAppointment(appointmentId, {
        paciente: appointment.paciente.id,
        odontologo: appointment.odontologo.id,
        fecha: newDate.format("YYYY-MM-DD"),
        horaInicio: newTimeStart,
        horaFin: newTimeEnd,
      });

      toast.success("Cita actualizada exitosamente");
      navigate("/agendamiento/detalles");
    } catch (error) {
      toast.error("Error al actualizar la cita");
    }
  };

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/agendamiento/detalles")}
        sx={{ mx: 2, my: 2 }}
      >
        Atras
      </Button>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Editar Cita
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Container component={Paper} sx={{ py: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Paciente"
                  name="paciente"
                  value={appointment.paciente.nombrePaciente} // Mostrar el nombre del paciente
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true, // Bloquea el campo para que no se pueda editar
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Odontólogo"
                  name="odontologo"
                  value={appointment.odontologo.nombreOdontologo} // Mostrar el nombre del odontólogo
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true, // Bloquea el campo para que no se pueda editar
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha"
                    value={newDate}
                    onChange={(date) => setNewDate(date)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    required
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hora de Inicio"
                  type="time"
                  name="horaInicio"
                  value={newTimeStart}
                  onChange={(e) => setNewTimeStart(e.target.value)}
                  inputProps={{ step: 900 }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hora de Fin"
                  type="time"
                  name="hora"
                  value={newTimeEnd}
                  onChange={(e) => setNewTimeEnd(e.target.value)}
                  inputProps={{ step: 900 }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Actualizar Cita
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default EditAppointment;
