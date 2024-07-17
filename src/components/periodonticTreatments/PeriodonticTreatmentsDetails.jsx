import React, { useEffect, useState } from "react";
import CreatePeriodonticTreatmentsForm from "./CreatePeriodonticTreatmentsForm";
import EditPeriodonticTreatmentsForm from "./EditPeriodonticTreatmentsForm";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { usePeriodonticTreatments } from "../../hooks/usePeriodonticTreatments";

const PeriodonticTreatmentsDetails = ({ patientId }) => {
  const {
    periodonticTreatment,
    createPeriodonticTreatment,
    updatePeriodonticTreatment,
    fetchPeriodonticTreatmentsByPatientId
  } = usePeriodonticTreatments();

  useEffect(() => {
    fetchPeriodonticTreatmentsByPatientId(patientId);
  }, [patientId]);

  return (
    <>
      {periodonticTreatment ? (
        <EditPeriodonticTreatmentsForm
          periodonticTreatment={periodonticTreatment}
          updatePeriodonticTreatment={updatePeriodonticTreatment}
        />
      ) : (
        <CreatePeriodonticTreatmentsForm
          patientId={patientId}
          createPeriodonticTreatment={createPeriodonticTreatment}
        />
      )}
    </>
  );
};

export default PeriodonticTreatmentsDetails;
