import React, { useState } from "react";
import { Typography, Grid, Box, Button, Container, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Consentimiento.css';

const CreateConsentimientoForm = ({ patientId, createConsentimiento }) => {
  const [formData, setFormData] = useState({
    archivo: null,
  });

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
      const newConsentimiento = {
        archivo: formData.archivo,
        paciente: patientId,
      };

      await createConsentimiento(newConsentimiento);
      toast.success("Consentimiento creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients"); // Redirige después de crear el consentimiento
    } catch (error) {
      toast.error("Error al crear el consentimiento", {
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
        Crear Consentimiento
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Declaro que he contestado todas las preguntas con honestidad y según mi conocimiento, dentro de mis capacidades mentales. Asimismo, he sido informado que los datos suministrados quedan reservados en la presente historia clínica, amparada en el secreto profesional y solo serán usados si fuese necesario.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <label htmlFor="archivo-input">
            <input
              id="archivo-input"
              accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }} // Ocultar el input file original
            />
            <Button
            sx={{
              color: 'white',
              backgroundColor: "#8ba082",
              '&:hover': {
                backgroundColor: "#5d6c56", 
              },
            }}
              variant="contained"
              component="span"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Subir Archivo
            </Button>
          </label>
        </Grid>
        {/* Puedes añadir más campos del formulario aquí según tus necesidades */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <AddCircleIcon fontSize="large" />
              Crear Consentimiento
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateConsentimientoForm;
