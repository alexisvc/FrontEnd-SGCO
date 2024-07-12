import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useCirugiaPatologia } from "../../hooks/useCirugiaPatologia";
import EditCirugiaPatologiaForm from "./EditCirugiaPatologiaForm";
import CreateCirugiaPatologiaForm from "./CreateCirugiaPatologiaForm";

const CirugiaPatologiaDetails = ({ patientId }) => {

  const { cirugiaPatologias, createCirugiaPatologia, updateCirugiaPatologia } = useCirugiaPatologia();
  const [cirugiaPatologia, setCirugiaPatologia] = useState(null);

  // Buscar si el paciente tiene una ortodoncia
  useEffect(() => {
    if (cirugiaPatologias && cirugiaPatologias.length > 0) {
      const cirugiaPatologia = cirugiaPatologias.find(
        (cirugiaPatologia) => cirugiaPatologia.paciente && cirugiaPatologia.paciente.id === patientId
      );
      if (cirugiaPatologia) {
        setCirugiaPatologia(cirugiaPatologia);
      } else {
        setCirugiaPatologia(null);
      }
    }
  }, [cirugiaPatologias, patientId]);

  return (
  <>
    {cirugiaPatologia ? (
        <EditCirugiaPatologiaForm
            patientId={patientId}
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
