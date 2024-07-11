import React, { useState } from "react";
import { IconButton, TableRow, TableCell, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CreateEvolucionOrtodonciaForm = ({
  ortodonciaId,
  createEvolucion,
}) => {
  const [formData, setFormData] = useState({
    fechaEvolucion: "",
    evolucion: "",
    arcoEvolucion: ""
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
    const newEvolucionData = {
      ...formData,
      ortodoncia: ortodonciaId,
    };
    await createEvolucion(newEvolucionData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
      fechaEvolucion: "",
      evolucion: "",
      arcoEvolucion: ""
    });
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
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CreateEvolucionOrtodonciaForm;
