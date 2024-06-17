import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const EditTreatmentForm = ({
  treatmentId,
  treatmentData,
  updatePatientTreatment,
}) => {
  const [formData, setFormData] = useState({
    cita: treatmentData?.cita || "",
    actividadPlanTrat: treatmentData?.actividadPlanTrat || "",
    fechaPlanTrat: treatmentData?.fechaPlanTrat || "",
    montoAbono: treatmentData?.montoAbono || "",
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
    await updatePatientTreatment(treatmentId, formData);
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
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditTreatmentForm;
