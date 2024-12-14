import React, { useState } from "react";
import { TableRow, TableCell, TextField, IconButton, TextareaAutosize } from "@mui/material";

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from "react-toastify";

const EditTreatmentForm = ({
  treatmentId,
  treatmentData,
  updatePatientTreatment,
}) => {
/*
  const [formData, setFormData] = useState({
    cita: treatmentData?.cita || "",
    actividadPlanTrat: treatmentData?.actividadPlanTrat || "",
    fechaPlanTrat: treatmentData?.fechaPlanTrat || "",
    montoAbono: treatmentData?.montoAbono || "",
  });
*/

  const [formData, setFormData] = useState({
    especialidad: treatmentData?.especialidad || "",
    actividades: treatmentData?.actividades || []
  });

  const [editingActivity, setEditingActivity] = useState(null);

  const [newActivity, setNewActivity] = useState({
    cita: "",
    actividadPlanTrat: "",
    fechaPlanTrat: "",
    montoAbono: ""
  });

  const handleAddActivity = () => {
    setFormData(prev => ({
      ...prev,
      actividades: [...prev.actividades, newActivity]
    }));
    setNewActivity({
      cita: "",
      actividadPlanTrat: "",
      fechaPlanTrat: "",
      montoAbono: ""
    });
  };

  const handleUpdateActivity = (index, field, value) => {
    const updatedActividades = [...formData.actividades];
    updatedActividades[index] = {
      ...updatedActividades[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      actividades: updatedActividades
    }));
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
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Especialidad</InputLabel>
            <Select
              value={formData.especialidad}
              onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
            >
              {especialidades.map(esp => (
                <MenuItem key={esp} value={esp}>{esp}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <List>
              {formData.actividades.map((actividad, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" onClick={() => setEditingActivity(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={`Cita ${actividad.cita}`}
                    secondary={
                      <>
                        <Box>{actividad.actividadPlanTrat}</Box>
                        <Box>Fecha: {new Date(actividad.fechaPlanTrat).toLocaleDateString()}</Box>
                        {actividad.montoAbono > 0 && (
                          <Box>Monto Abono: ${actividad.montoAbono}</Box>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {editingActivity !== null && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Cita"
                    value={formData.actividades[editingActivity].cita}
                    onChange={(e) => handleUpdateActivity(editingActivity, 'cita', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Fecha"
                    value={formData.actividades[editingActivity].fechaPlanTrat.split('T')[0]}
                    onChange={(e) => handleUpdateActivity(editingActivity, 'fechaPlanTrat', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Actividad"
                    value={formData.actividades[editingActivity].actividadPlanTrat}
                    onChange={(e) => handleUpdateActivity(editingActivity, 'actividadPlanTrat', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Monto Abono"
                    value={formData.actividades[editingActivity].montoAbono}
                    onChange={(e) => handleUpdateActivity(editingActivity, 'montoAbono', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={() => setEditingActivity(null)}>
                    Guardar Cambios
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Actualizar Planificación
          </Button>
        </Grid>
      </Grid>
    </Box>
    /*
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
    */
  );
};

export default EditTreatmentForm;
