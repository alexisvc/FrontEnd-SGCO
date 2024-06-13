import React, { useState } from "react";

const CreateTreatmentForm = ({
  patientId,
  createPatientTreatment,
}) => {
  const [formData, setFormData] = useState({
    cita: "",
    actividadPlanTrat: "",
    fechaPlanTrat: "",
    montoAbono: "",
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
    const newTreatmentData = {
      ...formData,
      paciente: patientId,
    };
    await createPatientTreatment(newTreatmentData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
      cita: "",
      actividadPlanTrat: "",
      fechaPlanTrat: "",
      montoAbono: "",
    });
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
        <button onClick={handleSubmit}>Crear</button>
      </td>
    </tr>
  );
};

export default CreateTreatmentForm;
