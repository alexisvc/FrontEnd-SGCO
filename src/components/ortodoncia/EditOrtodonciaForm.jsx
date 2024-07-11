import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Typography, Grid, Box, Button, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";

const EditOrtodonciaForm = ({ ortodoncia, updateOrtodoncia, evoluciones }) => {
  const [formData, setFormData] = useState({
    diagnosticoOrtodoncia: ortodoncia?.diagnosticoOrtodoncia || "",
    tiempoAproximadoOrtodoncia: ortodoncia?.tiempoAproximadoOrtodoncia || "",
    diagnosticoOrtopedia: ortodoncia?.diagnosticoOrtopedia || "",
    objetivoOrtopedia: ortodoncia?.objetivoOrtopedia || "",
    tiempoAproximadoOrtopedia: ortodoncia?.tiempoAproximadoOrtopedia || "",
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
    await updateOrtodoncia(ortodoncia.id, formData);
    navigate("/patients");
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Editar Ortodoncia
      </Typography>
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
          {evoluciones.map((evolucion) => (
            <p key={evolucion.id}>{evolucion.evolucion}</p>
          ))}
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
