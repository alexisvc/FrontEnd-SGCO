import React from "react";
import { Typography, Box } from "@mui/material";

const TreatmentPlansSummary = ({ patientTreatments }) => {
  // Calcular el total de los montos abonados
  const totalMontoAbono = patientTreatments.reduce((acc, treatment) => acc + parseFloat(treatment.montoAbono || 0), 0);

  return (
    <Box sx={{ mt: 4, p: 2, textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
      <Typography variant="h6" gutterBottom>
        Resumen de Montos Abonados
      </Typography>
      <Typography variant="body1">
        Total Abonado: <strong>${totalMontoAbono.toFixed(2)}</strong>
      </Typography>
    </Box>
  );
};

export default TreatmentPlansSummary;
