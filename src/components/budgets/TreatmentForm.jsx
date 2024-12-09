import React, { useState, useEffect } from 'react';
import { useAppointments } from '../../hooks/useAppointment';
import {
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import dayjs from "dayjs";

const TreatmentForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    cita: '',
    actividadPlanTrat: '',
    fechaPlanTrat: '',
    montoAbono: '',
    horaInicio: '',
    horaFin: ''
  });

  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [availableEndHours, setAvailableEndHours] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        cita: initialData.cita || '',
        actividadPlanTrat: initialData.actividadPlanTrat || '',
        fechaPlanTrat: initialData.fechaPlanTrat.split('T')[0] || '',
        montoAbono: initialData.montoAbono || ''
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (formData.fechaPlanTrat) {
      loadHorariosOcupados(formData.fechaPlanTrat);
    }
  }, [formData.fechaPlanTrat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadHorariosOcupados = async (fecha) => {
    const result = await fetchHorariosOcupados(odontologoId, fecha);
    if (result.success) {
      setHorariosOcupados(result.data);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 7; hour < 21; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = dayjs().hour(hour).minute(minute).format("HH:mm");
        options.push(time);
      }
    }
    return options;
  };

  const handleStartHourChange = (selectedHour) => {
    setFormData(prev => ({ ...prev, horaInicio: selectedHour }));
    const updatedAvailableEndHours = generateAvailableEndHours(selectedHour);
    setAvailableEndHours(updatedAvailableEndHours);
  };

  const isTimeOccupied = (time) => {
    return horariosOcupados.some(horario => 
      time >= horario.horaInicio && time < horario.horaFin
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.cita.trim() || !formData.actividadPlanTrat.trim() || 
        !formData.fechaPlanTrat || !formData.montoAbono) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    try {
      if (initialData) {
        await onSubmit(initialData.id, formData);
      } else {
        await onSubmit(formData);
      }
      
      // Limpiar formulario
      setFormData({
        cita: '',
        actividadPlanTrat: '',
        fechaPlanTrat: '',
        montoAbono: ''
      });
    } catch (error) {
      console.error('Error en el formulario:', error);
      toast.error('Error al guardar el tratamiento');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3, position: 'relative' }}>
      <IconButton 
        onClick={onCancel}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        {initialData ? 'Editar Tratamiento' : 'Nuevo Tratamiento'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cita"
              name="cita"
              value={formData.cita}
              onChange={handleChange}
              required
              placeholder="Ej: Cita 1"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha"
              name="fechaPlanTrat"
              value={formData.fechaPlanTrat}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
        </Grid>

        {/* Selector de hora inicio */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Hora de Inicio</InputLabel>
            <Select
              value={formData.horaInicio}
              onChange={(e) => handleStartHourChange(e.target.value)}
              label="Hora de Inicio"
            >
              {generateTimeOptions().map((time) => (
                <MenuItem 
                  key={time} 
                  value={time}
                  disabled={isTimeOccupied(time)}
                  style={{
                    backgroundColor: isTimeOccupied(time) ? 'rgba(255, 0, 0, 0.1)' : 'inherit'
                  }}
                >
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Selector de hora fin */}
        {formData.horaInicio && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Hora de Fin</InputLabel>
              <Select
                value={formData.horaFin}
                onChange={(e) => setFormData(prev => ({ ...prev, horaFin: e.target.value }))}
                label="Hora de Fin"
              >
                {availableEndHours.map((time) => (
                  <MenuItem 
                    key={time} 
                    value={time}
                    disabled={isTimeOccupied(time)}
                    style={{
                      backgroundColor: isTimeOccupied(time) ? 'rgba(255, 0, 0, 0.1)' : 'inherit'
                    }}
                  >
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Actividad"
              name="actividadPlanTrat"
              value={formData.actividadPlanTrat}
              onChange={handleChange}
              required
              multiline
              rows={3}
              placeholder="Descripción de la actividad a realizar"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Monto Abono"
              name="montoAbono"
              value={formData.montoAbono}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: '$',
                step: "0.01"
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button 
                variant="outlined" 
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant="contained"
              >
                {initialData ? 'Actualizar' : 'Guardar'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TreatmentForm;