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
    habit: patientMedicalRecord.habit,
    enfermedadesRespiratorias: patientMedicalRecord.enfermedadesRespiratorias,
    enfermedadesHormonales: patientMedicalRecord.enfermedadesHormonales,
    estaGestando: patientMedicalRecord.estaGestando,
    mesGestacion: patientMedicalRecord.mesGestacion,
    esMenorEdad: patientMedicalRecord.esMenorEdad,
    nombreRepresentante: patientMedicalRecord.nombreRepresentante,
    telRepresentante: patientMedicalRecord.telRepresentante,
    ultimaVisitaDentista: patientMedicalRecord.ultimaVisitaDentista,
    infiltracionesAnestesiaPrev: patientMedicalRecord.infiltracionesAnestesiaPrev,
    reaccionesAdversasInfiltracion: patientMedicalRecord.reaccionesAdversasInfiltracion,
    queReaccionInfiltracion: patientMedicalRecord.queReaccionInfiltracion,
    exodonciaCirugiaPrevias: patientMedicalRecord.exodonciaCirugiaPrevias,
    complicacionesLuegoCirugias: patientMedicalRecord.complicacionesLuegoCirugias,
    queComplicacionesCirugias: patientMedicalRecord.queComplicacionesCirugias,
    presentaDificultades: patientMedicalRecord.presentaDificultades,
    otraDificultad: patientMedicalRecord.otraDificultad,
    presenta: patientMedicalRecord.presenta,
    estadoLengua: patientMedicalRecord.estadoLengua,
    estadoLabios: patientMedicalRecord.estadoLabios,
    estadoCarillos: patientMedicalRecord.estadoCarillos,
    estadoPisoBoca: patientMedicalRecord.estadoPisoBoca,
    estadoGingivoPerio: patientMedicalRecord.estadoGingivoPerio,
    estadoEnfermedadPerio: patientMedicalRecord.estadoEnfermedadPerio,
    analisisOclusalDerRM: patientMedicalRecord.analisisOclusalDerRM,
    analisisOclusalDerRC: patientMedicalRecord.analisisOclusalDerRC,
    analisisOclusalIzqRM: patientMedicalRecord.analisisOclusalIzqRM,
    analisisOclusalIzqRC: patientMedicalRecord.analisisOclusalIzqRC,
    condicionEsqueletal: patientMedicalRecord.condicionEsqueletal,
    diagnosticoOclusal: patientMedicalRecord.diagnosticoOclusal,
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
    updateMedicalRecord(patientMedicalRecord.id, formData);
    navigate("/patients");
  };

  return (
    <div>
      <h2>Editar Historia Clínica</h2>
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
        <label>
          Enfermedades Respiratorias:
          <input
            type="text"
            name="enfermedadesRespiratorias"
            value={formData.enfermedadesRespiratorias}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Enfermedades Hormonales:
          <input
            type="text"
            name="enfermedadesHormonales"
            value={formData.enfermedadesHormonales}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ¿Está Gestando?:
          <input
            type="checkbox"
            name="estaGestando"
            checked={formData.estaGestando}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mes de Gestación:
          <input
            type="text"
            name="mesGestacion"
            value={formData.mesGestacion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ¿Es Menor de Edad?:
          <input
            type="checkbox"
            name="esMenorEdad"
            checked={formData.esMenorEdad}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nombre del Representante:
          <input
            type="text"
            name="nombreRepresentante"
            value={formData.nombreRepresentante}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Teléfono del Representante:
          <input
            type="text"
            name="telRepresentante"
            value={formData.telRepresentante}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Última Visita al Dentista:
          <input
            type="text"
            name="ultimaVisitaDentista"
            value={formData.ultimaVisitaDentista}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Infiltraciones Anestesia Previa:
          <input
            type="checkbox"
            name="infiltracionesAnestesiaPrev"
            checked={formData.infiltracionesAnestesiaPrev}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Reacciones Adversas a Infiltración:
          <input
            type="checkbox"
            name="reaccionesAdversasInfiltracion"
            checked={formData.reaccionesAdversasInfiltracion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ¿Qué Reacción?:
          <input
            type="text"
            name="queReaccionInfiltracion"
            value={formData.queReaccionInfiltracion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Exodoncia/Cirugías Previas:
          <input
            type="checkbox"
            name="exodonciaCirugiaPrevias"
            checked={formData.exodonciaCirugiaPrevias}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Complicaciones Luego de Cirugías:
          <input
            type="checkbox"
            name="complicacionesLuegoCirugias"
            checked={formData.complicacionesLuegoCirugias}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ¿Qué Complicaciones?:
          <input
            type="text"
            name="queComplicacionesCirugias"
            value={formData.queComplicacionesCirugias}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Presenta Dificultades:
          <input
            type="text"
            name="presentaDificultades"
            value={formData.presentaDificultades}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Otra Dificultad:
          <input
            type="text"
            name="otraDificultad"
            value={formData.otraDificultad}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Presenta:
          <input
            type="text"
            name="presenta"
            value={formData.presenta}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado de la Lengua:
          <input
            type="text"
            name="estadoLengua"
            value={formData.estadoLengua}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado de los Labios:
          <input
            type="text"
            name="estadoLabios"
            value={formData.estadoLabios}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado de los Carrillos:
          <input
            type="text"
            name="estadoCarillos"
            value={formData.estadoCarillos}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado del Piso de la Boca:
          <input
            type="text"
            name="estadoPisoBoca"
            value={formData.estadoPisoBoca}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado Gingivo Perio:
          <input
            type="text"
            name="estadoGingivoPerio"
            value={formData.estadoGingivoPerio}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado de Enfermedad Perio:
          <input
            type="text"
            name="estadoEnfermedadPerio"
            value={formData.estadoEnfermedadPerio}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Análisis Oclusal Der RM:
          <input
            type="text"
            name="analisisOclusalDerRM"
            value={formData.analisisOclusalDerRM}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Análisis Oclusal Der RC:
          <input
            type="text"
            name="analisisOclusalDerRC"
            value={formData.analisisOclusalDerRC}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Análisis Oclusal Izq RM:
          <input
            type="text"
            name="analisisOclusalIzqRM"
            value={formData.analisisOclusalIzqRM}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Análisis Oclusal Izq RC:
          <input
            type="text"
            name="analisisOclusalIzqRC"
            value={formData.analisisOclusalIzqRC}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Condición Esqueletal:
          <input
            type="text"
            name="condicionEsqueletal"
            value={formData.condicionEsqueletal}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Diagnóstico Oclusal:
          <input
            type="text"
            name="diagnosticoOclusal"
            value={formData.diagnosticoOclusal}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Guardar Historia Clínica</button>
      </form>
    </div>
  );
};

export default MedicalRecordForm;
