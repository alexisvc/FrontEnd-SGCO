import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  Container,
  Paper,
  TextField
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditCirugiaPatologiaForm = ({ cirugiaPatologia, updateCirugiaPatologia }) => {
  const [formData, setFormData] = useState({
    antecedentesCirPat: "",
    alergiasMedCirPat: "",
    patologiaTejBland: "",
    patologiaTejDuros: "",
    diagRadiografico: "",
    localizacionPatologia: ""
  });
  const [archivo1, setArchivo1] = useState(cirugiaPatologia?.archivo1);
  const [archivo2, setArchivo2] = useState(cirugiaPatologia?.archivo2);

  useEffect(() => {
    if (cirugiaPatologia) {
      setFormData({
        antecedentesCirPat: cirugiaPatologia.antecedentesCirPat || "",
        alergiasMedCirPat: cirugiaPatologia.alergiasMedCirPat || "",
        patologiaTejBland: cirugiaPatologia.patologiaTejBland || "",
        patologiaTejDuros: cirugiaPatologia.patologiaTejDuros || "",
        diagRadiografico: cirugiaPatologia.diagRadiografico || "",
        localizacionPatologia: cirugiaPatologia.localizacionPatologia || ""
      });
    }
  }, [cirugiaPatologia]);

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
      await updateCirugiaPatologia(cirugiaPatologia._id, formData, archivo1, archivo2);
      toast.success("Cirugía y patología actualizada exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
    } catch (error) {
      toast.error("Error al actualizar la Cirugía y patología.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container component={Paper} sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Editar Cirugía y Patología Oral
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
          {/* Botón de visualización para archivo1 */}
          {cirugiaPatologia?.archivo1 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.open(cirugiaPatologia.archivo1Url, "_blank")}
              style={{ marginLeft: "8px" }}
            >
              Ver Archivo 1
            </Button>
          )}
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
          {/* Botón de visualización para archivo2 */}
          {cirugiaPatologia?.archivo2Url && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.open(cirugiaPatologia.archivo2Url, "_blank")}
              style={{ marginLeft: "8px" }}
            >
              Ver Archivo 2
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Actualizar Cirugía y Patología Oral
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditCirugiaPatologiaForm;
