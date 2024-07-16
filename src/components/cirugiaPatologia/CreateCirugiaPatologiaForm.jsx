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

const CreateCirugiaPatologiaForm = ({ patientId, createCirugiaPatologia }) => {
  const [formData, setFormData] = useState({
    antecedentesCirPat: "",
    alergiasMedCirPat: "",
    patologiaTejBland: "",
    patologiaTejDuros: "",
    diagRadiografico: "",
    localizacionPatologia: "",
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
    const newData = {
      ...formData,
      paciente: patientId,
    };
    await createCirugiaPatologia(newData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
      antecedentesCirPat: "",
      alergiasMedCirPat: "",
      patologiaTejBland: "",
      patologiaTejDuros: "",
      diagRadiografico: "",
      localizacionPatologia: "",
    });
    navigate("/patients");
  };

  return (
    <Container component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        Crear Cirugía y Patología Oral
      </Typography>
      <Grid container spacing={2} sx={12}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Antecedentes específicos y generales"
            name="antecedentesCirPat"
            value={formData.antecedentesCirPat}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Alergias a medicamentos"
            name="alergiasMedCirPat"
            value={formData.alergiasMedCirPat}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Patología tejidos blandos"
            name="patologiaTejBland"
            value={formData.patologiaTejBland}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Patología tejidos duros"
            name="patologiaTejDuros"
            value={formData.patologiaTejDuros}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnóstico Radiográfico"
            name="diagRadiografico"
            value={formData.diagRadiografico}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Localización de la Patología"
            name="localizacionPatologia"
            value={formData.localizacionPatologia}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Crear Cirugía y Patología Oral
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateCirugiaPatologiaForm;
