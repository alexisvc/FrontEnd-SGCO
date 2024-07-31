import React, { useState } from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Button,
  TextareaAutosize,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateEvolutionChartForm = ({ patientId, createEvolutionChart }) => {
  const [formData, setFormData] = useState({
    fechaCuadEvol: "",
    actividadCuadEvol: "",
    recomendacionCuadEvol: "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.name === "archivo1") {
      setArchivo1(e.target.files[0]);
    } else if (e.target.name === "archivo2") {
      setArchivo2(e.target.files[0]);
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
      const newEvolutionChartData = {
        ...formData,
        paciente: patientId,
      };
      await createEvolutionChart(newEvolutionChartData, archivo1, archivo2);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
        fechaCuadEvol: "",
        actividadCuadEvol: "",
        recomendacionCuadEvol: "",
      });
      setArchivo1(null);
      setArchivo2(null);
      // Notificación de éxito
      toast.success("Cuadro de evolución creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
    } catch (error) {
      // Notificación de error
      toast.error("Error al crear el Cuadro de evolución.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          name="fechaCuadEvol"
          value={formData.fechaCuadEvol}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="date"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="actividadCuadEvol"
          value={formData.actividadCuadEvol}
          onChange={handleInputChange}
          //variant="outlined"
          minRows={3}
          style={{ 
            width: '100%', 
            padding: '4px', 
            fontSize: '14px', 
            fontFamily: 'Roboto',
            borderRadius: '4px',
          }}
          size="large"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="recomendacionCuadEvol"
          value={formData.recomendacionCuadEvol}
          onChange={handleInputChange}
          //variant="outlined"
          minRows={3}
          style={{ 
            width: '100%', 
            padding: '4px', 
            fontSize: '14px', 
            fontFamily: 'Roboto',
            borderRadius: '4px',
          }}
          size="large"
        />
      </TableCell>
      <TableCell>
        <Box mr={2}>
          <label htmlFor="archivo1-input">
            <input
              id="archivo1-input"
              name="archivo1"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              component="span"
              color="primary"
              sx={{
                color: "white",
                backgroundColor: "#8ba082",
                //margin: 2,
                "&:hover": {
                  backgroundColor: "#5d6c56",
                },
              }}
              startIcon={<AddCircleIcon />}
            >
              RX
            </Button>
          </label>
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <label htmlFor="archivo2-input">
            <input
              id="archivo2-input"
              name="archivo2"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              sx={{
                color: "white",
                backgroundColor: "#8ba082",
                //margin: 2,
                "&:hover": {
                  backgroundColor: "#5d6c56",
                },
              }}
              variant="contained"
              component="span"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              CS
            </Button>
          </label>
        </Box>
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={handleSubmit}>
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CreateEvolutionChartForm;
