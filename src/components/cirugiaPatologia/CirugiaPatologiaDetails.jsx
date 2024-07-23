import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useCirugiaPatologia } from "../../hooks/useCirugiaPatologia";
import EditCirugiaPatologiaForm from "./EditCirugiaPatologiaForm";
import CreateCirugiaPatologiaForm from "./CreateCirugiaPatologiaForm";

const CirugiaPatologiaDetails = ({ patientId }) => {

  const { cirugiaPatologia, createCirugiaPatologia, updateCirugiaPatologia, fetchCirugiaPatologiaByPatientId } = useCirugiaPatologia();

  useEffect(() => {
    fetchCirugiaPatologiaByPatientId(patientId);
  }, [patientId]);

  return (
  <>
    {cirugiaPatologia ? (
        <EditCirugiaPatologiaForm
            cirugiaPatologia={cirugiaPatologia}
            updateCirugiaPatologia={updateCirugiaPatologia}
        />
    ) : (
        <CreateCirugiaPatologiaForm
            patientId={patientId}
            createCirugiaPatologia={createCirugiaPatologia}
        />
    )}
  </>
);
};

export default CirugiaPatologiaDetails;
