import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

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
    await updateEvolucion(evolucionId, formData);
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
