import React, { useEffect, useState } from "react";
import CreateOrtodonciaForm from "./CreateOrtodonciaForm";
import EditOrtodonciaForm from "./EditOrtodonciaForm";
import { useOrtodoncia } from "../../hooks/useOrtdoncia";
import { useEvolucionOrtodoncia } from "../../hooks/useEvolucionOrtodoncia";

const OrtodonciaDetails = ({
  patientId
}) => {
  
  const {ortodoncia, createOrtodoncia, updateOrtodoncia, fetchOrtodonciasByPatientId} = useOrtodoncia();
  const {evoluciones, fetchEvolucionesByOrtodonciaId, createEvolucion, updateEvolucion} = useEvolucionOrtodoncia();

  // Buscar la ortodoncia del paciente
  useEffect(() => {
    fetchOrtodonciasByPatientId(patientId);
  }, [patientId]);

  // Buscar las evoluciones de la ortodoncia
  useEffect(() => {
    if (ortodoncia) {
      fetchEvolucionesByOrtodonciaId(ortodoncia._id);
    }
  }, [ortodoncia]);


  return (
    <>
      {ortodoncia ? (
        <EditOrtodonciaForm
          patientId={patientId}
          ortodoncia={ortodoncia}
          updateOrtodoncia={updateOrtodoncia}
          evoluciones={evoluciones}
          createEvolucion={createEvolucion}
          updateEvolucion={updateEvolucion}
        />
      ) : (
        <CreateOrtodonciaForm
          patientId={patientId}
          createOrtodoncia={createOrtodoncia}
        />
      )}
    </>
  );
};

export default OrtodonciaDetails;
