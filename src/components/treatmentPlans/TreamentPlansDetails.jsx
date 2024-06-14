import React from "react";
import EditTreatmentForm from "./EditTreatmentForm";
import CreateTreatmentForm from "./CreateTreatmentForm";

const TreamentPlansDetails = ({
  patientId,
  patientTreatments,
  createPatientTreatment,
  updatePatientTreatment,
  getAllPatientTreatments,
}) => {

  // Función para manejar la creación de un nuevo tratamiento
  const handleCreateTreatment = async (formData) => {
    const newTreatmentData = {
      ...formData,
      paciente: patientId,
    };
    await createPatientTreatment(newTreatmentData);
    await getAllPatientTreatments();
  };

  // Función para manejar la actualización de un tratamiento existente
  const handleUpdateTreatment = async (id, formData) => {
    await updatePatientTreatment(id, formData);
  };

  return (
    <>
      <h3>Tratamientos</h3>
      <table>
        <thead>
          <tr>
            <th>Cita</th>
            <th>Actividad Plan Tratamiento</th>
            <th>Fecha Plan Tratamiento</th>
            <th>Monto Abono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar cada tratamiento existente como una fila editable */}
          {patientTreatments.map((treatment) => (
            <EditTreatmentForm
              key={treatment.id}
              treatmentId={treatment.id}
              treatmentData={{
                cita: treatment.cita,
                actividadPlanTrat: treatment.actividadPlanTrat,
                fechaPlanTrat: treatment.fechaPlanTrat.split("T")[0],
                montoAbono: treatment.montoAbono,
              }}
              updatePatientTreatment={handleUpdateTreatment}
            />
          ))}

          {/* Fila para crear un nuevo tratamiento */}
          <CreateTreatmentForm
            patientId={patientId}
            createPatientTreatment={handleCreateTreatment}
          />
        </tbody>
      </table>
    </>
  );
};

export default TreamentPlansDetails;
