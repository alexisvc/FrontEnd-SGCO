import React, { useState } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";


const CreateEvolutionChartForm = ({
  patientId,
  createEvolutionChart,
}) => {
  const [formData, setFormData] = useState({
    fechaCuadEvol: "",
    actividadCuadEvol: "",
    recomendacionCuadEvol: "",
    firmaOdon: "",
    firmaPaciente: "",
  });

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
      await createEvolutionChart(newEvolutionChartData);
      // Lógica para limpiar el formulario o mostrar un mensaje de éxito
      setFormData({
          fechaCuadEvol: "",
          actividadCuadEvol: "",
          recomendacionCuadEvol: "",
          firmaOdon: "",
          firmaPaciente: "",
      });
      // Notificación de éxito
      toast.success("Cuadro de evolución creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });

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
        <TextField
          name="actividadCuadEvol"
          value={formData.actividadCuadEvol}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="recomendacionCuadEvol"
          value={formData.recomendacionCuadEvol}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="firmaOdon"
          value={formData.firmaOdon}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="firmaPaciente"
          value={formData.firmaPaciente}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell align='center'>
        <IconButton onClick={handleSubmit}>
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CreateEvolutionChartForm;
