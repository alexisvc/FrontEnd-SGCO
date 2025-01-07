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
  Chip,
  Divider
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import usePatientTreatments from '../../hooks/usePatientTreatments';
import budgetService from '../../services/budgetService';

const TreamentPlansDetails = ({ patientId }) => {
  const [plansWithBudgets, setPlansWithBudgets] = useState([]);
  const { getPatientTreatmentsByPatientId } = usePatientTreatments();

  useEffect(() => {
    const loadPlansAndBudgets = async () => {
      try {
        const plans = await getPatientTreatmentsByPatientId(patientId);
        
        // Obtener presupuestos para cada plan
        const plansData = await Promise.all(plans.map(async (plan) => {
          const budget = await budgetService.getBudgetByTreatment(plan._id);
          return {
            ...plan,
            budget: budget || null
          };
        }));
        
        setPlansWithBudgets(plansData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    if (patientId) {
      loadPlansAndBudgets();
    }
  }, [patientId]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Planificaciones y Presupuestos del Paciente
      </Typography>

      {plansWithBudgets.map((plan, index) => (
        <Accordion key={plan._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">
                Planificación {index + 1} - {plan.especialidad}
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {plan.budget ? `Presupuesto: $${plan.budget.totalGeneral}` : 'Sin presupuesto'}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {/* Sección de Planificación */}
            <Typography variant="h6" gutterBottom>Actividades Planificadas</Typography>
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
                      <TableCell>
                        {new Date(actividad.fechaPlanTrat).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={actividad.estado}
                          color={actividad.estado === 'completado' ? 'success' : 
                                actividad.estado === 'en-proceso' ? 'primary' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">${actividad.montoAbono || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Sección de Presupuesto */}
            {plan.budget && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Presupuesto</Typography>
                {plan.budget.fases.map((fase, faseIndex) => (
                  <Box key={faseIndex} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {fase.nombre}
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Procedimiento</TableCell>
                            <TableCell align="right">N° Piezas</TableCell>
                            <TableCell align="right">Costo Unitario</TableCell>
                            <TableCell align="right">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fase.procedimientos.map((proc, procIndex) => (
                            <TableRow key={procIndex}>
                              <TableCell>{proc.nombre}</TableCell>
                              <TableCell align="right">{proc.numeroPiezas}</TableCell>
                              <TableCell align="right">${proc.costoPorUnidad}</TableCell>
                              <TableCell align="right">${proc.costoTotal}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={3} align="right">
                              <strong>Total Fase:</strong>
                            </TableCell>
                            <TableCell align="right">
                              <strong>${fase.total}</strong>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Typography variant="h6">
                    Total General: ${plan.budget.totalGeneral}
                  </Typography>
                </Box>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default TreamentPlansDetails;