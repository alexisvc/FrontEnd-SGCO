import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton, TextareaAutosize } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";

const CreateTreatmentForm = ({
  patientId,
  createPatientTreatment,
}) => {
  const [formData, setFormData] = useState({
    cita: "",
    actividadPlanTrat: "",
    fechaPlanTrat: "",
    montoAbono: "",
    especialidad: "",
  });

  const especialidades = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Rehabilitación Oral',
    'Odontopediatría',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTreatmentData = {
        ...formData,
        paciente: patientId,
      };
      await createPatientTreatment(newTreatmentData);
      setFormData({
        cita: "",
        actividadPlanTrat: "",
        fechaPlanTrat: "",
        montoAbono: "",
        especialidad: "",
      });
      toast.success("Plan de tratamiento creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Error al crear el plan de tratamiento.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTreatmentData = {
        paciente: patientId,
        especialidad: formData.especialidad,
        actividades: [{
          cita: formData.cita,
          actividadPlanTrat: formData.actividadPlanTrat,
          fechaPlanTrat: formData.fechaPlanTrat,
          montoAbono: formData.montoAbono || 0
        }]
      };

      await createPatientTreatment(newTreatmentData);
      setFormData({
        especialidad: "",
        cita: "",
        actividadPlanTrat: "",
        fechaPlanTrat: "",
        montoAbono: ""
      });
      toast.success("Planificación creada exitosamente");
    } catch (error) {
      toast.error("Error al crear la planificación");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Especialidad</InputLabel>
            <Select
              name="especialidad"
              value={formData.especialidad}
              onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
            >
              {especialidades.map(esp => (
                <MenuItem key={esp} value={esp}>{esp}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Cita"
            name="cita"
            value={formData.cita}
            onChange={(e) => setFormData({...formData, cita: e.target.value})}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha"
            name="fechaPlanTrat"
            value={formData.fechaPlanTrat}
            onChange={(e) => setFormData({...formData, fechaPlanTrat: e.target.value})}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Actividad"
            name="actividadPlanTrat"
            value={formData.actividadPlanTrat}
            onChange={(e) => setFormData({...formData, actividadPlanTrat: e.target.value})}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Monto Abono"
            name="montoAbono"
            value={formData.montoAbono}
            onChange={(e) => setFormData({...formData, montoAbono: e.target.value})}
            InputProps={{ startAdornment: '$' }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Crear Planificación
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateTreatmentForm;
