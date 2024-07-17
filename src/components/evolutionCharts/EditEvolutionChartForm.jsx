import React, { useState } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";

const EditEvolutionChartForm = ({
  evolutionChartId,
  evolutionChartData,
  updateEvolutionChart,
}) => {
  const [formData, setFormData] = useState({
    fechaCuadEvol: evolutionChartData?.fechaCuadEvol || "",
    actividadCuadEvol: evolutionChartData?.actividadCuadEvol || "",
    recomendacionCuadEvol: evolutionChartData?.recomendacionCuadEvol || "",
    firmaOdon: evolutionChartData?.firmaOdon || "",
    firmaPaciente: evolutionChartData?.firmaPaciente || "",
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
      await updateEvolutionChart(evolutionChartId, formData);
      // Notificación de éxito
      toast.success("Cuadro de evolución actualizado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });

    } catch (error) {
      // Notificación de error
      toast.error("Error al actualizar el Cuadro de evolución.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <TableRow >
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
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditEvolutionChartForm;
