import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useDisfuncionMandibular } from "../../hooks/useDisfuncionMandibular";
import EditDisfuncionMandibularForm from "./EditDisfuncionMandibularForm";
import CreateDisfuncionMandibularForm from "./CreateDisfuncionMandibularForm";

const DisfuncionMandibularDetails = ({ patientId }) => {

  const { disfuncionMandibular, createDisfuncionMandibular, updateDisfuncionMandibular, fetchDisfuncionMandibularByPatientId } = useDisfuncionMandibular();

  useEffect(() => {
    fetchDisfuncionMandibularByPatientId(patientId);
  }, [patientId]);

  return (
  <>
    {disfuncionMandibular ? (
        <EditDisfuncionMandibularForm
            disfuncionMandibular={disfuncionMandibular}
            updateDisfuncionMandibular={updateDisfuncionMandibular}
        />
    ) : (
        <CreateDisfuncionMandibularForm
            patientId={patientId}
            createDisfuncionMandibular={createDisfuncionMandibular}
        />
    )}
  </>
);
};

export default DisfuncionMandibularDetails;
