import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Grid, TextField, Container, Paper, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useOdontologos } from "../../hooks/useOdontologos";

const EditOdontologo = () => {
  const { odontologoId } = useParams(); // Obtener el id del odontólogo desde la URL
  const { fetchOdontologoById, updateOdontologo } = useOdontologos();
  const navigate = useNavigate();

  const [odontologo, setOdontologo] = useState({
    nombreOdontologo: "",
    edadOdontologo: "",
    correoOdontologo: "",
    direccionOdontologo: "",
    generoOdontologo: "",
    especialidad: "",
    telefono: "",
  });

  useEffect(() => {
    const loadOdontologo = async () => {
      try {
        const fetchedOdontologo = await fetchOdontologoById(odontologoId);
        console.log(fetchedOdontologo); // Verifica la respuesta aquí
        setOdontologo(fetchedOdontologo);
      } catch (error) {
        toast.error("Error al cargar el odontólogo");
      }
    };
    loadOdontologo();
  }, [odontologoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOdontologo({ ...odontologo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOdontologo(odontologoId, odontologo);
      toast.success("Odontólogo actualizado exitosamente");
      navigate("/odontologos");
    } catch (error) {
      toast.error("Error al actualizar el odontólogo");
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Editar Odontólogo
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Container component={Paper} sx={{ py: 1 }}>
          <Typography variant="h6" gutterBottom align="center">
            Editar Información
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombreOdontologo"
                value={odontologo.nombreOdontologo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Edad"
                name="edadOdontologo"
                value={odontologo.edadOdontologo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo"
                name="correoOdontologo"
                value={odontologo.correoOdontologo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccionOdontologo"
                value={odontologo.direccionOdontologo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Género"
                name="generoOdontologo"
                value={odontologo.generoOdontologo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Especialidad"
                name="especialidad"
                value={odontologo.especialidad}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={odontologo.telefono}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Actualizar Odontólogo
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default EditOdontologo;
