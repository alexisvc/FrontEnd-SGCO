import React, { useState } from "react";
import { IconButton, TableRow, TableCell, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CreateTreatmentForm = ({
  patientId,
  createPatientTreatment,
}) => {
  const [formData, setFormData] = useState({
    cita: "",
    actividadPlanTrat: "",
    fechaPlanTrat: "",
    montoAbono: "",
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
    const newTreatmentData = {
      ...formData,
      paciente: patientId,
    };
    await createPatientTreatment(newTreatmentData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
      cita: "",
      actividadPlanTrat: "",
      fechaPlanTrat: "",
      montoAbono: "",
    });
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          name="cita"
          value={formData.cita}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="actividadPlanTrat"
          value={formData.actividadPlanTrat}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="fechaPlanTrat"
          value={formData.fechaPlanTrat}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="date"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="montoAbono"
          value={formData.montoAbono}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="number"
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

export default CreateTreatmentForm;
