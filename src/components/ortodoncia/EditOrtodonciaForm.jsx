import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Typography, Grid, Box, Button, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router";
import EvolucionOrtodonciaDetails from "../evolucionOrtodoncia/EvolucionOrtodonciaDetails";

const EditOrtodonciaForm = ({ ortodoncia, updateOrtodoncia, evoluciones, createEvolucion, updateEvolucion }) => {
  const [formData, setFormData] = useState({
    diagnostico: ortodoncia?.diagnostico || "",
    objetivo: ortodoncia?.objetivo || "",
    tiempoAproximado: ortodoncia?.tiempoAproximado || "",
    tipoBracket: ortodoncia?.tipoBracket || "",
    aparatoOrtopedico: ortodoncia?.aparatoOrtopedico || "",
    observaciones: ortodoncia?.observaciones || ""
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
    <Container component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        Editar Ortodoncia
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
        {/* Mostrar cada evolución existente como una fila editable */}
        <EvolucionOrtodonciaDetails
          ortodoncia={ortodoncia}
          evoluciones={evoluciones}
          createEvolucion={createEvolucion}
          updateEvolucion={updateEvolucion}
        />

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
