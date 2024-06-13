import React, { useState } from "react";
import { useNavigate } from "react-router";

const PatientTreatments = ({
  patientId,
  patientTreatments,
  createPatientTreatment,
  updatePatientTreatment,
}) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState(
    patientTreatments.reduce((acc, treatment) => {
      acc[treatment.id] = {
        cita: treatment.cita,
        actividadPlanTrat: treatment.actividadPlanTrat,
        fechaPlanTrat: treatment.fechaPlanTrat.split("T")[0],
        montoAbono: treatment.montoAbono,
      };
      return acc;
    }, {})
  );

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [id]: {
        ...formData[id],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (id) {
      updatePatientTreatment(id, { ...formData[id], paciente: patientId });
      navigate('/patients')
    } else {
      createPatientTreatment({ ...formData[id], paciente: patientId });
    }
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
          {patientTreatments.map((treatment) => (
            <tr key={treatment.id}>
              <td>
                <input
                  type="text"
                  name="cita"
                  value={formData[treatment.id]?.cita || ""}
                  onChange={(e) => handleInputChange(e, treatment.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="actividadPlanTrat"
                  value={formData[treatment.id]?.actividadPlanTrat || ""}
                  onChange={(e) => handleInputChange(e, treatment.id)}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="fechaPlanTrat"
                  value={formData[treatment.id]?.fechaPlanTrat || ""}
                  onChange={(e) => handleInputChange(e, treatment.id)}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  name="montoAbono"
                  value={formData[treatment.id]?.montoAbono || ""}
                  onChange={(e) => handleInputChange(e, treatment.id)}
                />
              </td>
              <td>
                <button onClick={(e) => handleSubmit(e, treatment.id)}>
                  {treatment.id ? "Guardar" : "Crear"}
                </button>
              </td>
            </tr>
          ))}
          {!patientTreatments.length && (
            <tr>
              <td>
                <input
                  type="text"
                  name="cita"
                  value={formData["new"]?.cita || ""}
                  onChange={(e) => handleInputChange(e, "new")}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="actividadPlanTrat"
                  value={formData["new"]?.actividadPlanTrat || ""}
                  onChange={(e) => handleInputChange(e, "new")}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="fechaPlanTrat"
                  value={formData["new"]?.fechaPlanTrat || ""}
                  onChange={(e) => handleInputChange(e, "new")}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  name="montoAbono"
                  value={formData["new"]?.montoAbono || ""}
                  onChange={(e) => handleInputChange(e, "new")}
                />
              </td>
              <td>
                <button onClick={(e) => handleSubmit(e, "new")}>Crear</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PatientTreatments;
