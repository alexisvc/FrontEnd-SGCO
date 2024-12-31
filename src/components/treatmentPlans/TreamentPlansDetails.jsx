import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import usePatientTreatments from '../../hooks/usePatientTreatments';

const TreamentPlansDetails = ({ patientId }) => {
  const [plans, setPlans] = useState([]);
  const { getPatientTreatmentsByPatientId } = usePatientTreatments();

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getPatientTreatmentsByPatientId(patientId);
        setPlans(data);
      } catch (error) {
        console.error('Error al cargar planes:', error);
      }
    };

    if (patientId) {
      loadPlans();
    }
  }, [patientId]);

  const getStatusColor = (status) => ({
    'pendiente': 'default',
    'en-proceso': 'primary',
    'completado': 'success'
  }[status] || 'default');

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4"
          gutterBottom
          align="center"
          sx={{ pt: 2, pb: 1 }}>
        Planificaciones del Paciente
      </Typography>

      {plans.length > 0 ? (
        plans.map((plan, index) => (
          <Accordion key={plan._id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                  Planificación {index + 1} - {plan.especialidad}
                </Typography>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {plan.actividades.length} actividades | 
                    {plan.actividades.filter(a => a.estado === 'completado').length} completadas
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cita</TableCell>
                      <TableCell>Actividad</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell align="right">Abono</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plan.actividades.map((actividad, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{actividad.cita}</TableCell>
                        <TableCell>{actividad.actividadPlanTrat}</TableCell>
                        <TableCell>{formatDate(actividad.fechaPlanTrat)}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={actividad.estado}
                            color={getStatusColor(actividad.estado)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          ${actividad.montoAbono || 0}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} align="right">
                        <strong>Total Abonos:</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>
                          ${plan.actividades.reduce((sum, act) => sum + (act.montoAbono || 0), 0)}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography color="text.secondary" align="center">
          No hay planificaciones registradas
        </Typography>
      )}
    </Paper>
  );
};

export default TreamentPlansDetails;