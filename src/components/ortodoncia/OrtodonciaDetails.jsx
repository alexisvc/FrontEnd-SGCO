import React, { useEffect, useState } from "react";
import CreateOrtodonciaForm from "./CreateOrtodonciaForm";
import EditOrtodonciaForm from "./EditOrtodonciaForm";

const OrtodonciaDetails = ({
  patientId,
  ortodoncia,
  fetchOrtodonciasByPatientId,
  createOrtodoncia,
  updateOrtodoncia,
}) => {
  useEffect(() => {
    console.log(patientId);
    fetchOrtodonciasByPatientId(patientId);
    console.log(ortodoncia);
  }, [patientId]);

  return (
    <>
      {ortodoncia ? (
        <EditOrtodonciaForm
          patientId={patientId}
          ortodoncia={ortodoncia}
          updateOrtodoncia={updateOrtodoncia}
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
