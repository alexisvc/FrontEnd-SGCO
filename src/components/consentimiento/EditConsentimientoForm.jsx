import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Button, Container, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Consentimiento.css";

const EditConsentimientoForm = ({ consentimiento, updateConsentimiento }) => {
  const [formData, setFormData] = useState({
    archivo: null,
  });

  useEffect(() => {
    if (consentimiento) {
      setFormData({
        archivo: consentimiento.archivo,
      });
    }
  }, [consentimiento]);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      archivo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedConsentimiento = {
        archivo: formData.archivo,
      };

      await updateConsentimiento(consentimiento._id, updatedConsentimiento);
      toast.success("Consentimiento actualizado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
    } catch (error) {
      toast.error("Error al actualizar el consentimiento", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container component={Paper} sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Editar Consentimiento
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Declaro que he contestado todas las preguntas con honestidad y según mi conocimiento, dentro de mis capacidades mentales. Asimismo, he sido informado que los datos suministrados quedan reservados en la presente historia clínica, amparada en el secreto profesional y solo serán usados si fuese necesario.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <label htmlFor="archivo-input">
              <input
                id="archivo-input"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }} // Ocultar el input file original
              />
              <Button
                variant="contained"
                component="span"
                color="primary"
                startIcon={<AddCircleIcon />}
                sx={{
                  color: 'white',
                  backgroundColor: "#8ba082",
                  //margin: 2,
                  '&:hover': {
                    backgroundColor: "#5d6c56", 
                  },
                }}
              >
                Editar Archivo
              </Button>
            </label>
            {consentimiento.archivo && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={() => window.open(consentimiento.archivoUrl, "_blank")}
              >
                Ver Consentimiento
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <SaveIcon fontSize="large" />
              Editar Consentimiento
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditConsentimientoForm;
