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
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditCirugiaPatologiaForm = ({ cirugiaPatologia, updateCirugiaPatologia }) => {
  const [formData, setFormData] = useState({
    antecedentesCirPat: "",
    alergiasMedCirPat: "",
    patologiaTejBland: "",
    patologiaTejDuros: "",
    diagRadiografico: "",
    localizacionPatologia: "",
    extraccionDental: "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  useEffect(() => {
    if (cirugiaPatologia) {
      setFormData({
        antecedentesCirPat: cirugiaPatologia.antecedentesCirPat || "",
        alergiasMedCirPat: cirugiaPatologia.alergiasMedCirPat || "",
        patologiaTejBland: cirugiaPatologia.patologiaTejBland || "",
        patologiaTejDuros: cirugiaPatologia.patologiaTejDuros || "",
        diagRadiografico: cirugiaPatologia.diagRadiografico || "",
        localizacionPatologia: cirugiaPatologia.localizacionPatologia || "",
        extraccionDental: cirugiaPatologia.extraccionDental || ""
      });
      setArchivo1(cirugiaPatologia?.archivo1);
      setArchivo2(cirugiaPatologia?.archivo2);
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
      console.log("formData", formData);
      console.log("archivo1", archivo1);
      console.log("archivo2", archivo2);
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
        {/* Botones de archivo */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Box display="flex" alignItems="center" mr={2}>
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
              {cirugiaPatologia?.archivo1Url && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => window.open(cirugiaPatologia.archivo1Url, "_blank")}
                  startIcon={<DownloadIcon />}
                  sx={{ ml: 2 }} // Margin left to create space
                >
                  RX
                </Button>
              )}
            </Box>
            <Box display="flex" alignItems="center">
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
              {cirugiaPatologia?.archivo2Url && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => window.open(cirugiaPatologia.archivo2Url, "_blank")}
                  startIcon={<DownloadIcon />}
                  sx={{ ml: 2 }} // Margin left to create space
                >
                  CS
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
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
          <TextField
            fullWidth
            label="Extracción Dental"
            name="extraccionDental"
            value={formData.extraccionDental}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Grid>
        {/* Botón de enviar */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <SaveIcon fontSize="large" />
              Actualizar Cirugía y Patología Oral
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditCirugiaPatologiaForm;
