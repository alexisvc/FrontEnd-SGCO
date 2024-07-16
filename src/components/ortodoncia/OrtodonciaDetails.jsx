import React, { useEffect, useState } from "react";
import CreateOrtodonciaForm from "./CreateOrtodonciaForm";
import EditOrtodonciaForm from "./EditOrtodonciaForm";
import { useOrtodoncia } from "../../hooks/useOrtdoncia";
import { useEvolucionOrtodoncia } from "../../hooks/useEvolucionOrtodoncia";

const OrtodonciaDetails = ({
  patientId
}) => {
  
  const {ortodoncias, createOrtodoncia, updateOrtodoncia} = useOrtodoncia();
  const [ortodoncia, setOrtodoncia] = useState(null);
  const {evoluciones, fetchEvolucionesByOrtodonciaId, createEvolucion, updateEvolucion} = useEvolucionOrtodoncia();

  // Buscar si el paciente tiene una ortodoncia
  useEffect(() => {
    if (ortodoncias && ortodoncias.length > 0) {
      const ortodoncia = ortodoncias.find(
        (ortodoncia) => ortodoncia.paciente && ortodoncia.paciente.id === patientId
      );
      if (ortodoncia) {
        setOrtodoncia(ortodoncia);
      } else {
        setOrtodoncia(null);
      }
    }
  }, [ortodoncias, patientId]);

  // Buscar las evoluciones de la ortodoncia
  useEffect(() => {
    if (ortodoncia) {
      fetchEvolucionesByOrtodonciaId(ortodoncia.id);
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
