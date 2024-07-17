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
    periodonticTreatments,
    createPeriodonticTreatment,
    updatePeriodonticTreatment,
  } = usePeriodonticTreatments();
  const [periodonticTreatment, setPeriodonticTreatment] = useState(null);

  useEffect(() => {
    if (periodonticTreatments && periodonticTreatments.length > 0) {
      const periodonticTreatment = periodonticTreatments.find(
        (periodonticTreatment) =>
          periodonticTreatment.paciente &&
          periodonticTreatment.paciente.id === patientId
      );
      if (periodonticTreatment) {
        setPeriodonticTreatment(periodonticTreatment);
      } else {
        setPeriodonticTreatment(null);
      }
    }
  }, [periodonticTreatments, patientId]);

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
