import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Typography, Grid, Box, Button, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";

const EditCirugiaPatologiaForm = ({
  cirugiaPatologia,
  updateCirugiaPatologia
}) => {
  const [formData, setFormData] = useState({
    antecedentesCirPat: cirugiaPatologia?.antecedentesCirPat || "",
    alergiasMedCirPat: cirugiaPatologia?.alergiasMedCirPat || "",
    patologiaTejBland: cirugiaPatologia?.patologiaTejBland || "",
    patologiaTejDuros: cirugiaPatologia?.patologiaTejDuros || "",
    diagRadiografico: cirugiaPatologia?.diagRadiografico || "",
    localizacionPatologia: cirugiaPatologia?.localizacionPatologia || "",
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
    await updateCirugiaPatologia(cirugiaPatologia.id, formData);
    navigate("/patients");
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Editar Cirugía y Patología Oral
      </Typography>
      <Grid container spacing={2} sx={{ margin: 2 }}>
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
              Editar Cirugía y Patología Oral
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditCirugiaPatologiaForm;