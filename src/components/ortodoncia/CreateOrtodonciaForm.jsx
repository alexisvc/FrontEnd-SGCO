import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Container,
  Paper,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";

const CreateOrtodonciaForm = ({ patientId, createOrtodoncia }) => {
  const [formData, setFormData] = useState({
    diagnostico: "",
    objetivo: "",
    tiempoAproximado: "",
    tipoBracket: "",
    aparatoOrtopedico: "",
    observaciones: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTreatmentData = {
      ...formData,
      paciente: patientId,
    };
    await createOrtodoncia(newTreatmentData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
      diagnostico: "",
      objetivo: "",
      tiempoAproximado: "",
      tipoBracket: "",
      aparatoOrtopedico: "",
      observaciones: "",
    });
    navigate("/patients");
  };

  return (
    <Container component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        Crear Ortodoncia
      </Typography>
      <Grid container spacing={2} sx={12}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnóstico "
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Objetivo"
            name="objetivo"
            value={formData.objetivo}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tiempo Aproximado"
            name="tiempoAproximado"
            value={formData.tiempoAproximado}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tipo de Bracket"
            name="tipoBracket"
            value={formData.tipoBracket}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Aparato Ortopédico"
            name="aparatoOrtopedico"
            value={formData.aparatoOrtopedico}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Crear HC Ortodoncia
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateOrtodonciaForm;
