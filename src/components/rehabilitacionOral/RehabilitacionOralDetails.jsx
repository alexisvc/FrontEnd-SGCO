import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useRehabilitacionOral } from "../../hooks/useRehabilitacionOral";
import EditRehabilitacionOralForm from "./EditRehabilitacionOralForm";
import CreateRehabilitacionOralForm from "./CreateRehabilitacionOralForm";

const RehabilitacionOralDetails = ({ patientId }) => {
  const {
    rehabilitacionOralList,
    createRehabilitacionOral,
    updateRehabilitacionOral,
  } = useRehabilitacionOral();
  const [rehabilitacionOral, setRehabilitacionOral] = useState(null);

  // Buscar si el paciente tiene una ortodoncia
  useEffect(() => {
    if (rehabilitacionOralList && rehabilitacionOralList.length > 0) {
      const rehabilitacionOral = rehabilitacionOralList.find(
        (rehabilitacionOral) =>
          rehabilitacionOral.paciente &&
          rehabilitacionOral.paciente.id === patientId
      );
      if (rehabilitacionOral) {
        setRehabilitacionOral(rehabilitacionOral);
        console.log(rehabilitacionOral);
      } else {
        setRehabilitacionOral(null);
        console.log(rehabilitacionOral);
      }
    }
  }, [rehabilitacionOralList, patientId]);

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
