import React, { useState } from "react";

const CreateEvolutionChartForm = ({
  patientId,
  createEvolutionChart,
}) => {
  const [formData, setFormData] = useState({
    fechaCuadEvol: "",
    actividadCuadEvol: "",
    recomendacionCuadEvol: "",
    firmaOdon: "",
    firmaPaciente: "",
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
    const newEvolutionChartData = {
      ...formData,
      paciente: patientId,
    };
    await createEvolutionChart(newEvolutionChartData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
        fechaCuadEvol: "",
        actividadCuadEvol: "",
        recomendacionCuadEvol: "",
        firmaOdon: "",
        firmaPaciente: "",
    });
  };

  return (
    <tr>
      <td>
        <input
          type="date"
          name="fechaCuadEvol"
          value={formData.fechaCuadEvol}
          onChange={handleInputChange}
          placeholder="Fecha"
        />
      </td>
      <td>
        <input
          type="text"
          name="actividadCuadEvol"
          value={formData.actividadCuadEvol}
          onChange={handleInputChange}
          placeholder="Actividad Clínica"
        />
      </td>
      <td>
        <input
          type="text"
          name="recomendacionCuadEvol"
          value={formData.recomendacionCuadEvol}
          onChange={handleInputChange}
          placeholder="Recomendación"
        />
      </td>
      <td>
        <input
          type="text"          
          name="firmaOdon"
          value={formData.firmaOdon}
          onChange={handleInputChange}
          placeholder="Firma Odontólogo"
        />
      </td>
      <td>
        <input
          type="text"
          name="firmaPaciente"
          value={formData.firmaPaciente}
          onChange={handleInputChange}
          placeholder="Firma Paciente"
        />
      </td>
      <td>
        <button onClick={handleSubmit}>Crear</button>
      </td>
    </tr>
  );
};

export default CreateEvolutionChartForm;
