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

const CreateCirugiaPatologiaForm = ({ patientId, createCirugiaPatologia }) => {
  const [formData, setFormData] = useState({
    antecedentesCirPat: "",
    alergiasMedCirPat: "",
    patologiaTejBland: "",
    patologiaTejDuros: "",
    diagRadiografico: "",
    localizacionPatologia: "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "archivo1") {
      setArchivo1(e.target.files[0]);
    } else if (e.target.name === "archivo2") {
      setArchivo2(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        ...formData,
        paciente: patientId,
      };
      await createCirugiaPatologia(newData, archivo1, archivo2);
      setFormData({
        antecedentesCirPat: "",
        alergiasMedCirPat: "",
        patologiaTejBland: "",
        patologiaTejDuros: "",
        diagRadiografico: "",
        localizacionPatologia: "",
      });
      setArchivo1(null);
      setArchivo2(null);
      toast.success("Cirugía y patología creada exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
    } catch (error) {
      toast.error("Error al crear la Cirugía y patología.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        Crear Cirugía y Patología Oral
      </Typography>
      <Grid container spacing={2}>
        {/* Campos de texto */}
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
              Subir Archivo 1
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
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
              Subir Archivo 2
            </Button>
          </label>
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
