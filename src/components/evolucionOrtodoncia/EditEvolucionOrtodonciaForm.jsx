import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";

const EditEvolucionOrtodonciaForm = ({
  evolucionId,
  evolucionData,
  updateEvolucion,
}) => {
  const [formData, setFormData] = useState({
    fechaEvolucion: evolucionData?.fechaEvolucion || "",
    evolucion: evolucionData?.evolucion || "",
    arcoEvolucion: evolucionData?.arcoEvolucion || ""
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
      await updateEvolucion(evolucionId, formData);
      // Notificación de éxito
      toast.success("Evolución Ortodoncia actualizada exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });

    } catch (error) {
      // Notificación de error
      toast.error("Error al actualizar la Evolución Ortodoncia.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          name="fechaEvolucion"
          value={formData.fechaEvolucion}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="date"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="evolucion"
          value={formData.evolucion}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="arcoEvolucion"
          value={formData.arcoEvolucion}
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

export default EditEvolucionOrtodonciaForm;
