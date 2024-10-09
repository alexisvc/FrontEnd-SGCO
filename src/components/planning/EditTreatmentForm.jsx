import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton, TextareaAutosize } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";

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

    try {
      await updatePatientTreatment(treatmentId, formData);
      toast.success("Plan de tratamiento actualizado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Error al actualizar el plan de tratamiento.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
        <TextareaAutosize
          name="actividadPlanTrat"
          value={formData.actividadPlanTrat}
          onChange={handleInputChange}
          minRows={3}
          style={{
            width: "100%",
            padding: "4px",
            fontSize: "14px",
            fontFamily: "Roboto",
            borderRadius: "4px",
          }}
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
      <TableCell align="center">
        <IconButton onClick={handleSubmit}>
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditTreatmentForm;
