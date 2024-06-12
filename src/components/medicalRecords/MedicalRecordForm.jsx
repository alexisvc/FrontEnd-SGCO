import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MedicalRecordForm = ({ patientId, updateMedicalRecord, patientMedicalRecord }) => {

  const [formData, setFormData] = useState({
    date: patientMedicalRecord.date.split('T')[0],
    description: patientMedicalRecord.description,
    paciente: patientId,
    motivoConsulta: patientMedicalRecord.motivoConsulta,
    expectativaPaciente: patientMedicalRecord.expectativaPaciente,
    enfermedadSistemica: patientMedicalRecord.enfermedadSistemica,
    enfermedadPreexistente: patientMedicalRecord.enfermedadPreexistente,
    medicoTratante: patientMedicalRecord.medicoTratante,
    telMedicoTratante: patientMedicalRecord.telMedicoTratante,
    medicamentosConsume: patientMedicalRecord.medicamentosConsume,
    alergiaMedicamentos: patientMedicalRecord.alergiaMedicamentos,
    habit: [],
    enfermedadesRespiratorias: "",
    enfermedadesHormonales: "",
    estaGestando: false,
    mesGestacion: "",
    esMenorEdad: false,
    nombreRepresentante: "",
    telRepresentante: "",
    ultimaVisitaDentista: "",
    infiltracionesAnestesiaPrev: false,
    reaccionesAdversasInfiltracion: false,
    queReaccionInfiltracion: "",
    exodonciaCirugiaPrevias: false,
    complicacionesLuegoCirugias: false,
    queComplicacionesCirugias: "",
    presentaDificultades: [],
    otraDificultad: "",
    presenta: [],
    estadoLengua: "",
    estadoLabios: "",
    estadoCarillos: "",
    estadoPisoBoca: "",
    estadoGingivoPerio: "",
    estadoEnfermedadPerio: "",
    analisisOclusalDerRM: "",
    analisisOclusalDerRC: "",
    analisisOclusalIzqRM: "",
    analisisOclusalIzqRC: "",
    condicionEsqueletal: "",
    diagnosticoOclusal: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMedicalRecord(patientMedicalRecord.id ,formData);
    navigate("/patients");
  };

  return (
    <div>
      <h2>Crear Historia Clínica</h2>
      <form onSubmit={handleSubmit}>
        <label>{formData.paciente}</label>
        <label>
          Fecha:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <br />
        <label>
          Motivo de Consulta:
          <input
            type="text"
            name="motivoConsulta"
            value={formData.motivoConsulta}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Expectativa del Paciente:
          <input
            type="text"
            name="expectativaPaciente"
            value={formData.expectativaPaciente}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Enfermedad Sistémica:
          <input
            type="text"
            name="enfermedadSistemica"
            value={formData.enfermedadSistemica}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Enfermedad Preexistente:
          <input
            type="text"
            name="enfermedadPreexistente"
            value={formData.enfermedadPreexistente}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Médico Tratante:
          <input
            type="text"
            name="medicoTratante"
            value={formData.medicoTratante}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Teléfono del Médico Tratante:
          <input
            type="text"
            name="telMedicoTratante"
            value={formData.telMedicoTratante}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Medicamentos que Consume:
          <input
            type="text"
            name="medicamentosConsume"
            value={formData.medicamentosConsume}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Alergia a Medicamentos:
          <input
            type="text"
            name="alergiaMedicamentos"
            value={formData.alergiaMedicamentos}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {/* Agrega los demás campos aquí */}
        <button type="submit">Guardar Historia Clínica</button>
      </form>
    </div>
  );
};

export default MedicalRecordForm;
