import React, { useState } from "react";

const EditEvolutionChartForm = ({
  evolutionChartId,
  evolutionChartData,
  updateEvolutionChart,
}) => {
  const [formData, setFormData] = useState({
    fechaCuadEvol: evolutionChartData?.fechaCuadEvol || "",
    actividadCuadEvol: evolutionChartData?.actividadCuadEvol || "",
    recomendacionCuadEvol: evolutionChartData?.recomendacionCuadEvol || "",
    firmaOdon: evolutionChartData?.firmaOdon || "",
    firmaPaciente: evolutionChartData?.firmaPaciente || "",
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
    await updateEvolutionChart(evolutionChartId, formData);
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
        <button onClick={handleSubmit}>Guardar</button>
      </td>
    </tr>
  );
};

export default EditEvolutionChartForm;
