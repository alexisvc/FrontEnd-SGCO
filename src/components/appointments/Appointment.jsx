import React, { useEffect, useState } from "react";
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
  Container,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAppointments } from "../../hooks/useAppointment";
import { usePatients } from "../../hooks/usePatients";
import { useOdontologos } from "../../hooks/useOdontologos";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Appointment = () => {
  const { appointments, createAppointment, fetchAppointmentsByOdontologo } = useAppointments();
  const { patients, fetchPatientByCedula, fetchPatientByName } = usePatients();
  const { odontologos, fetchOdontologos } = useOdontologos();

  const navigate = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");

  const [selectedOdontologo, setSelectedOdontologo] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("cedula");
  const [searched, setSearched] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    paciente: "",
    fecha: "",
    hora: "",
  });
  const [availableHours, setAvailableHours] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const handleHourClick = (hour) => {
    setNewAppointment((prev) => ({ ...prev, hora: hour }));
    setSelectedHour(hour);
  };

  useEffect(() => {
    fetchOdontologos();
  }, []);

  useEffect(() => {
    if (selectedOdontologo) {
      fetchAppointmentsByOdontologo(selectedOdontologo);
    }
  }, [selectedOdontologo]);

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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setNewAppointment({ ...newAppointment, fecha: selectedDate });

    const occupiedHours = appointments
      .filter((appointment) => appointment.fecha.split("T")[0] === selectedDate)
      .map((appointment) => appointment.hora);

    const allHours = generateAvailableHours();
    const available = allHours.filter((hour) => !occupiedHours.includes(hour));
    setAvailableHours(available);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchType === "cedula") {
        await fetchPatientByCedula(searchQuery);
      } else {
        await fetchPatientByName(searchQuery);
      }
      setSearched(true);
    } catch (error) {
      toast.error("Error al buscar el paciente", { autoClose: 3000 });
      setSearched(false);
    }
  };

  const handleCreateAppointment = async () => {
    try {
      await createAppointment({
        ...newAppointment,
        paciente: selectedPatient.id,
        odontologo: selectedOdontologo,
      });
      toast.success("Cita creada exitosamente", { autoClose: 3000 });
      navigate("/agendamiento/detalles");
    } catch (error) {
      toast.error("Error al crear la cita", { autoClose: 3000 });
    }
  };

  const handleConfirmAppointment = () => {
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const confirmCreateAppointment = () => {
    handleCreateAppointment();
    closeConfirmDialog();
  };

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/agendamiento/detalles")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
      <Container style={{align: 'Center', paddingBottom: 4, paddingTop: 4 }}>
        <Grid container spacing={4}>
          {/* Primera columna: Formulario */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" align="center" gutterBottom>
              Agendar Citas
            </Typography>

            {/* Seleccionar Odontólogo */}
            <Box sx={{ my: 3 }}>
              <Typography variant="h5" gutterBottom>
                Odontólogo
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Seleccionar Odontólogo</InputLabel>
                <Select
                  value={selectedOdontologo || ""}
                  onChange={(e) => setSelectedOdontologo(e.target.value)}
                  label="Seleccionar Odontólogo"
                >
                  {odontologos.map((odontologo) => (
                    <MenuItem key={odontologo.id} value={odontologo.id}>
                      {odontologo.nombreOdontologo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {selectedOdontologo && (
              <>
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
                          <MenuItem value="name">Nombre</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label={searchType === "cedula" ? "Ingrese Cédula" : "Ingrese Nombre"}
                        name="searchQuery"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} alignContent={"center"} alignItems={"center"}>
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
                          <TableCell>
                            <Typography variant="h6" align="center">
                              Nombre
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" align="center">
                              Cédula
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" align="center">
                              Seleccionar
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {patients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell align="center">{patient.nombrePaciente}</TableCell>
                            <TableCell align="center">{patient.numeroCedula}</TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                onClick={() => setSelectedPatient(patient)}
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
              </>
            )}

            {selectedPatient && (
              <>
                <Box component="form" sx={{ mt: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    Seleccionar Fecha para {selectedPatient.nombrePaciente}
                  </Typography>
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
                      min: today,
                    }}
                  />
                </Box>

                {newAppointment.fecha && (
                  <>
                    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                      Horas Disponibles para el {newAppointment.fecha}
                    </Typography>
                    <Grid container spacing={2}>
                      {availableHours.map((hour, index) => (
                        <Grid item xs={1} key={index}>
                          <Button
                            variant={selectedHour === hour ? 'contained' : 'outlined'}
                            color={selectedHour === hour ? 'secondary' : 'primary'}
                            fullWidth
                            onClick={() => handleHourClick(hour)}
                            sx={{
                              padding: 1,
                            }}
                          >
                            {hour}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>

          {/* Segunda columna: Resumen */}
          <Grid item xs={12} md={4}>
            {(selectedOdontologo || selectedPatient || newAppointment.fecha || newAppointment.hora) && (
              <Box component={Paper} sx={{ mt: 4, p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                  Resumen de la Cita
                </Typography>
                {selectedOdontologo && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Odontólogo:</strong> {odontologos.find((o) => o.id === selectedOdontologo)?.nombreOdontologo}
                  </p>
                )}
                {selectedPatient && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Paciente:</strong> {selectedPatient.nombrePaciente}
                  </p>
                )}
                {newAppointment.fecha && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Fecha:</strong> {newAppointment.fecha}
                  </p>
                )}
                {newAppointment.hora && (
                  <p style={{ fontFamily: 'Century Gothic' }}>
                    <strong>Hora:</strong> {newAppointment.hora}
                  </p>
                )}
              </Box>
            )}

            {newAppointment.hora && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmAppointment}
                  sx={{ mt: 4 }}
                >
                  Confirmar Cita
                </Button>

                <Dialog
                  open={confirmDialogOpen}
                  onClose={closeConfirmDialog}
                  aria-labelledby="confirm-dialog-title"
                  aria-describedby="confirm-dialog-description"
                >
                  <DialogTitle id="confirm-dialog-title">
                    Confirmar Creación de Cita
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                      ¿Está seguro de que desea crear la siguiente cita?
                      <br />
                      <strong>Odontólogo:</strong> {odontologos.find((o) => o.id === selectedOdontologo)?.nombreOdontologo}
                      <br />
                      <strong>Paciente:</strong> {selectedPatient.nombrePaciente}
                      <br />
                      <strong>Fecha:</strong> {newAppointment.fecha}
                      <br />
                      <strong>Hora:</strong> {newAppointment.hora}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeConfirmDialog} color="secondary">
                      Cancelar
                    </Button>
                    <Button onClick={confirmCreateAppointment} color="primary" autoFocus>
                      Confirmar
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Appointment;
