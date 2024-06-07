import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';

const MedicalRecords = () => {
  const { patientId } = useParams();
  const { medicalRecords, fetchMedicalRecordsByPatientId, createMedicalRecord } = useMedicalRecords();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMedicalRecord, setNewMedicalRecord] = useState({
    date: '',
    description: '',
    paciente: patientId,
    motivoConsulta: '',
    expectativaPaciente: '',
    enfermedadSistemica: '',
    enfermedadPreexistente: '',
    medicoTratante: '',
    telMedicoTratante: '',
    medicamentosConsume: '',
    alergiaMedicamentos: '',
    habitosNocivos: [],
    enfermedadesRespiratorias: '',
    enfermedadesHormonales: '',
    estaGestando: false,
    mesGestacion: '',
    esMenorEdad: false,
    nombreRepresentante: '',
    telRepresentante: '',
    ultimaVisitaDentista: '',
    infiltracionesAnestesiaPrev: false,
    reaccionesAdversasInfiltracion: false,
    queReaccionInfiltracion: '',
    exodonciaCirugiaPrevias: false,
    complicacionesLuegoCirugias: false,
    queComplicacionesCirugias: '',
    presentaDificultades: [],
    otraDificultad: '',
    presenta: [],
    estadoLengua: '',
    estadoLabios: '',
    estadoCarillos: '',
    estadoPisoBoca: '',
    estadoGingivoPerio: '',
    estadoEnfermedadPerio: '',
    analisisOclusalDerRM: '',
    analisisOclusalDerRC: '',
    analisisOclusalIzqRM: '',
    analisisOclusalIzqRC: '',
    condicionEsqueletal: '',
    diagnosticoOclusal: ''
  });

  useEffect(() => {
    fetchMedicalRecordsByPatientId(patientId);
  }, [patientId, fetchMedicalRecordsByPatientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicalRecord(prevRecord => ({ ...prevRecord, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewMedicalRecord(prevRecord => ({ ...prevRecord, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMedicalRecord(newMedicalRecord);
    setNewMedicalRecord({
      date: '',
      description: '',
      paciente: patientId,
      motivoConsulta: '',
      expectativaPaciente: '',
      enfermedadSistemica: '',
      enfermedadPreexistente: '',
      medicoTratante: '',
      telMedicoTratante: '',
      medicamentosConsume: '',
      alergiaMedicamentos: '',
      habitosNocivos: [],
      enfermedadesRespiratorias: '',
      enfermedadesHormonales: '',
      estaGestando: false,
      mesGestacion: '',
      esMenorEdad: false,
      nombreRepresentante: '',
      telRepresentante: '',
      ultimaVisitaDentista: '',
      infiltracionesAnestesiaPrev: false,
      reaccionesAdversasInfiltracion: false,
      queReaccionInfiltracion: '',
      exodonciaCirugiaPrevias: false,
      complicacionesLuegoCirugias: false,
      queComplicacionesCirugias: '',
      presentaDificultades: [],
      otraDificultad: '',
      presenta: [],
      estadoLengua: '',
      estadoLabios: '',
      estadoCarillos: '',
      estadoPisoBoca: '',
      estadoGingivoPerio: '',
      estadoEnfermedadPerio: '',
      analisisOclusalDerRM: '',
      analisisOclusalDerRC: '',
      analisisOclusalIzqRM: '',
      analisisOclusalIzqRC: '',
      condicionEsqueletal: '',
      diagnosticoOclusal: ''
    });
  };

  return (
    <div>
      <h1>Historias Clínicas</h1>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Ocultar Formulario de Creación' : 'Crear Nueva Historia Clínica'}
      </button>
      {showCreateForm && (
        <div>
          <h3>Crear Nueva Historia Clínica</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Fecha:
              <input
                type="date"
                name="date"
                value={newMedicalRecord.date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Descripción:
              <textarea
                name="description"
                value={newMedicalRecord.description}
                onChange={handleChange}
                required
              />
            </label>
            {/* Agregar más campos de formulario aquí para cada atributo */}
            <button type="submit">Crear Historia Clínica</button>
          </form>
        </div>
      )}
      <div>
        <h3>Lista de Historias Clínicas</h3>
        <ul>
  {medicalRecords.map((record) => (
    <li key={record.id}>
      <p>Date: {record.date}</p>
      <p>Description: {record.description}</p>
      <p>Motivo Consulta: {record.motivoConsulta}</p>
      <p>Expectativa Paciente: {record.expectativaPaciente}</p>
      <p>Enfermedad Sistémica: {record.enfermedadSistemica}</p>
      <p>Enfermedad Preexistente: {record.enfermedadPreexistente}</p>
      <p>Médico Tratante: {record.medicoTratante}</p>
      <p>Teléfono Médico Tratante: {record.telMedicoTratante}</p>
      <p>Medicamentos que Consume: {record.medicamentosConsume}</p>
      <p>Alergia a Medicamentos: {record.alergiaMedicamentos}</p>
      <p>Hábitos Nocivos: {record.habitosNocivos.join(', ')}</p>
      <p>Enfermedades Respiratorias: {record.enfermedadesRespiratorias}</p>
      <p>Enfermedades Hormonales: {record.enfermedadesHormonales}</p>
      <p>¿Está Gestando?: {record.estaGestando ? 'Sí' : 'No'}</p>
      <p>Mes de Gestación: {record.mesGestacion}</p>
      <p>¿Es Menor de Edad?: {record.esMenorEdad ? 'Sí' : 'No'}</p>
      <p>Nombre del Representante: {record.nombreRepresentante}</p>
      <p>Teléfono del Representante: {record.telRepresentante}</p>
      <p>Última Visita al Dentista: {record.ultimaVisitaDentista}</p>
      <p>Infiltraciones de Anestesia Previas: {record.infiltracionesAnestesiaPrev ? 'Sí' : 'No'}</p>
      <p>Reacciones Adversas a la Infiltración: {record.reaccionesAdversasInfiltracion ? 'Sí' : 'No'}</p>
      <p>Qué Reacción a la Infiltración: {record.queReaccionInfiltracion}</p>
      <p>Exodoncia o Cirugías Previas: {record.exodonciaCirugiaPrevias ? 'Sí' : 'No'}</p>
      <p>Complicaciones Luego de Cirugías: {record.complicacionesLuegoCirugias ? 'Sí' : 'No'}</p>
      <p>Qué Complicaciones Luego de Cirugías: {record.queComplicacionesCirugias}</p>
      <p>Presenta Dificultades: {record.presentaDificultades.join(', ')}</p>
      <p>Otra Dificultad: {record.otraDificultad}</p>
      <p>Presenta: {record.presenta.join(', ')}</p>
      <p>Estado de la Lengua: {record.estadoLengua}</p>
      <p>Estado de los Labios: {record.estadoLabios}</p>
      <p>Estado de los Carrillos: {record.estadoCarillos}</p>
      <p>Estado del Piso de la Boca: {record.estadoPisoBoca}</p>
      <p>Estado Gingivo-Perio: {record.estadoGingivoPerio}</p>
      <p>Estado de Enfermedad Perio: {record.estadoEnfermedadPerio}</p>
      <p>Análisis Oclusal Derecho RM: {record.analisisOclusalDerRM}</p>
      <p>Análisis Oclusal Derecho RC: {record.analisisOclusalDerRC}</p>
      <p>Análisis Oclusal Izquierdo RM: {record.analisisOclusalIzqRM}</p>
      <p>Análisis Oclusal Izquierdo RC: {record.analisisOclusalIzqRC}</p>
      <p>Condición Esquelética: {record.condicionEsqueletal}</p>
      <p>Diagnóstico Oclusal: {record.diagnosticoOclusal}</p>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
};

export default MedicalRecords;
