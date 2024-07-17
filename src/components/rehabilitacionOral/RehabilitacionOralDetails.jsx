import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useRehabilitacionOral } from "../../hooks/useRehabilitacionOral";
import EditRehabilitacionOralForm from "./EditRehabilitacionOralForm";
import CreateRehabilitacionOralForm from "./CreateRehabilitacionOralForm";

const RehabilitacionOralDetails = ({ patientId }) => {
  const {
    rehabilitacionOral,
    createRehabilitacionOral,
    updateRehabilitacionOral,
    fetchRehabilitacionOralByPatientId
  } = useRehabilitacionOral();

  useEffect(() => {
    fetchRehabilitacionOralByPatientId(patientId);
  }, [patientId]);

  return (
    <>
      {rehabilitacionOral ? (
        <EditRehabilitacionOralForm
          rehabilitacionOral={rehabilitacionOral}
          updateRehabilitacionOral={updateRehabilitacionOral}
        />
      ) : (
        <CreateRehabilitacionOralForm
          patientId={patientId}
          createRehabilitacionOral={createRehabilitacionOral}
        />
      )}
    </>
  );
};

export default RehabilitacionOralDetails;
