import React, { useState } from "react";

const EditTreatmentForm = ({
  treatmentId,
  treatmentData,
  updatePatientTreatment,
}) => {
  const [formData, setFormData] = useState({
    cita: treatmentData?.cita || "",
    actividadPlanTrat: treatmentData?.actividadPlanTrat || "",
    fechaPlanTrat: treatmentData?.fechaPlanTrat || "",
    montoAbono: treatmentData?.montoAbono || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePatientTreatment(treatmentId, formData);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          name="cita"
          value={formData.cita}
          onChange={handleInputChange}
          placeholder="Cita"
        />
      </td>
      <td>
        <input
          type="text"
          name="actividadPlanTrat"
          value={formData.actividadPlanTrat}
          onChange={handleInputChange}
          placeholder="Actividad Plan Tratamiento"
        />
      </td>
      <td>
        <input
          type="date"
          name="fechaPlanTrat"
          value={formData.fechaPlanTrat}
          onChange={handleInputChange}
          placeholder="Fecha Plan Tratamiento"
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          name="montoAbono"
          value={formData.montoAbono}
          onChange={handleInputChange}
          placeholder="Monto Abono"
        />
      </td>
      <td>
        <button onClick={handleSubmit}>Guardar</button>
      </td>
    </tr>
  );
};

export default EditTreatmentForm;
