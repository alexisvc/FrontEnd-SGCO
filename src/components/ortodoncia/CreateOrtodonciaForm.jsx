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
import { toast } from "react-toastify";

const CreateOrtodonciaForm = ({ patientId, createOrtodoncia }) => {
  const [formData, setFormData] = useState({
    diagnostico: "",
    objetivo: "",
    tiempoAproximado: "",
    tipoBracket: "",
    aparatoOrtopedico: "",
    observaciones: "",
  });

  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);
  const [archivo3, setArchivo3] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.name === "archivo1") {
      setArchivo1(e.target.files[0]);
    } else if (e.target.name === "archivo2") {
      setArchivo2(e.target.files[0]);
    } else if (e.target.name === "archivo3") {
      setArchivo3(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const newTreatmentData = {
        ...formData,
        paciente: patientId,
      };
      await createOrtodoncia(newTreatmentData, archivo1, archivo2, archivo3);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        diagnostico: "",
        objetivo: "",
        tiempoAproximado: "",
        tipoBracket: "",
        aparatoOrtopedico: "",
        observaciones: "",
      });
      setArchivo1(null);
      setArchivo2(null);
      setArchivo3(null);
      // Notificación de éxito
      toast.success("Ortodoncia creada exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/patients');

    } catch (error) {
      // Notificación de error
      toast.error("Error al actualizar la Ortodoncia.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        Crear Ortodoncia
      </Typography>
      <Grid container spacing={2} sx={12}>
        {/* Botones de archivo */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Box mr={2}>
              <label htmlFor="archivo1-input">
                <input
                  id="archivo1-input"
                  name="archivo1"
                  type="file"
                  accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                >
                  RX
                </Button>
              </label>
            </Box>
            <Box mr={2}>
              <label htmlFor="archivo2-input">
                <input
                  id="archivo2-input"
                  name="archivo2"
                  type="file"
                  accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                >
                  CS
                </Button>
              </label>
            </Box>
            <Box mr={2}>
              <label htmlFor="archivo3-input">
                <input
                  id="archivo3-input"
                  name="archivo3"
                  type="file"
                  accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                >
                  C
                </Button>
              </label>
            </Box>
          </Box>
        </Grid>
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
            <Button sx = {{mb:2}} variant="contained" color="primary" onClick={handleSubmit}>
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
