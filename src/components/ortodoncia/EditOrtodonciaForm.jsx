import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  Typography, 
  Grid, 
  Box, 
  Button, 
  Container,
} from '@mui/material';
import AddCircleIcon from "@mui/icons-material/AddCircle";

const EditOrtodonciaForm = ({ ortodoncia, updateOrtodoncia }) => {
  const [formData, setFormData] = useState({
    diagnosticoOrtodoncia: ortodoncia[0]?.diagnosticoOrtodoncia || "",
    tiempoAproximadoOrtodoncia: ortodoncia[0]?.tiempoAproximadoOrtodoncia || "",
    diagnosticoOrtopedia: ortodoncia[0]?.diagnosticoOrtopedia || "",
    objetivoOrtopedia: ortodoncia[0]?.objetivoOrtopedia || "",
    tiempoAproximadoOrtopedia: ortodoncia[0]?.tiempoAproximadoOrtopedia || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateOrtodoncia(ortodoncia[0].id, formData);
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>Editar Ortodoncia</Typography>
      <Grid container spacing={2} sx={{ margin: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnóstico de Ortodoncia"
            name="diagnosticoOrtodoncia"
            value={formData.diagnosticoOrtodoncia}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tiempo Aproximado de Ortodoncia"
            name="tiempoAproximadoOrtodoncia"
            value={formData.tiempoAproximadoOrtodoncia}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnóstico de Ortopedia"
            name="diagnosticoOrtopedia"
            value={formData.diagnosticoOrtopedia}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Objetivo de Ortopedia"
            name="objetivoOrtopedia"
            value={formData.objetivoOrtopedia}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tiempo Aproximado de Ortopedia"
            name="tiempoAproximadoOrtopedia"
            value={formData.tiempoAproximadoOrtopedia}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Editar HC Ortodoncia
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditOrtodonciaForm;
