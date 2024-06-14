import React from "react";
import EditEvolutionChartForm from "./EditEvolutionChartForm";
import CreateEvolutionChartForm from "./CreateEvolutionChartForm";


const EvolutionChartsDetails = ({
  patientId,
  evolutionCharts,
  createEvolutionChart,
  updateEvolutionChart,
  fetchEvolutionCharts,
  
}) => {

  // Función para manejar la creación de un nuevo tratamiento
  const handleCreateEvolutionCharts = async (formData) => {
    const newEvolutionChartData = {
      ...formData,
      paciente: patientId,
    };
    await createEvolutionChart(newEvolutionChartData);
    await fetchEvolutionCharts();
  };

  // Función para manejar la actualización de un tratamiento existente
  const handleUpdateEvolutionCharts = async (id, formData) => {
    await updateEvolutionChart(id, formData);
  };

  return (
    <>
      <h3>Cuadro de Evolución</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Actividad Clínica</th>
            <th>Recomendación</th>
            <th>Firma Odontólogo</th>
            <th>Firma Paciente</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar cada tratamiento existente como una fila editable */}
          {evolutionCharts.map((chart) => (
            <EditEvolutionChartForm
              key={chart.id}
              evolutionChartId={chart.id}
              evolutionChartData={{
                fechaCuadEvol: chart.fechaCuadEvol.split("T")[0],
                actividadCuadEvol: chart.actividadCuadEvol,
                recomendacionCuadEvol: chart.recomendacionCuadEvol,
                firmaOdon: chart.firmaOdon,
                firmaPaciente: chart.firmaPaciente,
              }}
              updateEvolutionChart={handleUpdateEvolutionCharts}
            />
          ))}

          {/* Fila para crear un nuevo tratamiento */}
          <CreateEvolutionChartForm
            patientId={patientId}
            createEvolutionChart={handleCreateEvolutionCharts}
          />


        </tbody>
      </table>
    </>
  );
};

export default EvolutionChartsDetails;
