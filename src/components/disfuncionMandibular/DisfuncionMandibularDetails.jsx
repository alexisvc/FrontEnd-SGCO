import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useDisfuncionMandibular } from "../../hooks/useDisfuncionMandibular";
import EditDisfuncionMandibularForm from "./EditDisfuncionMandibularForm";
import CreateDisfuncionMandibularForm from "./CreateDisfuncionMandibularForm";

const DisfuncionMandibularDetails = ({ patientId }) => {

  const { disfuncionMandibularList, createDisfuncionMandibular, updateDisfuncionMandibular } = useDisfuncionMandibular();
  const [disfuncionMandibular, setDisfuncionMandibular] = useState(null);

  // Buscar si el paciente tiene una ortodoncia
  useEffect(() => {
    if (disfuncionMandibularList && disfuncionMandibularList.length > 0) {
      const disfuncionMandibular = disfuncionMandibularList.find(
        (disfuncionMandibular) => disfuncionMandibular.paciente && disfuncionMandibular.paciente.id === patientId
      );
      if (disfuncionMandibular) {
        setDisfuncionMandibular(disfuncionMandibular);
      } else {
        setDisfuncionMandibular(null);
      }
    }
  }, [disfuncionMandibularList, patientId]);

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
