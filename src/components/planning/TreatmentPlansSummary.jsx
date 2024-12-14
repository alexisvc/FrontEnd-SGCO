import React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";

const TreatmentPlansSummary = ({ patientTreatments }) => {
  const calcularTotalAbonos = (treatment) => {
    return treatment.actividades.reduce((sum, act) => sum + (Number(act.montoAbono) || 0), 0);
  };

  const resumenPorEspecialidad = patientTreatments.reduce((acc, treatment) => {
    if (!acc[treatment.especialidad]) {
      acc[treatment.especialidad] = {
        totalAbonos: 0,
        cantidadActividades: 0,
        presupuestoTotal: 0
      };
    }

    acc[treatment.especialidad].totalAbonos += calcularTotalAbonos(treatment);
    acc[treatment.especialidad].cantidadActividades += treatment.actividades.length;
    acc[treatment.especialidad].presupuestoTotal += treatment.budget?.totalGeneral || 0;

    return acc;
  }, {});

  return (
    <Paper sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Resumen de Planificaciones
      </Typography>

      {Object.entries(resumenPorEspecialidad).map(([especialidad, datos]) => (
        <Box key={especialidad} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {especialidad}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>
                Total Abonado: ${datos.totalAbonos.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                Actividades: {datos.cantidadActividades}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                Presupuesto: ${datos.presupuestoTotal.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
        <Typography variant="h6" align="center">
          Total General: ${Object.values(resumenPorEspecialidad).reduce(
            (sum, datos) => sum + datos.presupuestoTotal,
            0
          ).toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TreatmentPlansSummary;
