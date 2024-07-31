import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Patients.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { usePatients } from "../../hooks/usePatients";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";

const PatientDetails = ({ updatePatient }) => {
  const location = useLocation();
  const navigate = useNavigate();
  //const { updatePatient } = usePatients();
  const { patient } = location.state;

  const [editablePatient, setEditablePatient] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditablePatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await updatePatient(patient.id, editablePatient);
      // Notificación de éxito
      toast.success("Paciente actualizado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");

    } catch (error) {
      setEditablePatient({ ...patient });
      // Notificación de error
      toast.error("Error al crear el paciente.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    
    <Container component={Paper} sx={{mb: 4}}>
      <Typography variant="h4" align="center" gutterBottom>
        Detalles del Paciente
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre del Paciente"
              name="nombrePaciente"
              value={editablePatient.nombrePaciente}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Edad del Paciente"
              name="edadPaciente"
              value={editablePatient.edadPaciente}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              value={editablePatient.fechaNacimiento.split("T")[0]}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Correo electrónico"
              name="correoPaciente"
              value={editablePatient.correoPaciente}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dirección"
              name="direccionPaciente"
              value={editablePatient.direccionPaciente}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Género"
              name="generoPaciente"
              value={editablePatient.generoPaciente}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número de Cédula"
              name="numeroCedula"
              value={editablePatient.numeroCedula}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ocupación"
              name="ocupacion"
              value={editablePatient.ocupacion}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={editablePatient.telefono}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono de Contacto de Emergencia"
              name="telContactoEmergencia"
              value={editablePatient.telContactoEmergencia}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Afinidad de Contacto de Emergencia"
              name="afinidadContactoEmergencia"
              value={editablePatient.afinidadContactoEmergencia}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sx = {{m: 2}} style={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Actualizar Paciente
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PatientDetails;
