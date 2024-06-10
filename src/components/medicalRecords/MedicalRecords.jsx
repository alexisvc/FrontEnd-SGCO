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

  const handleCheckboxChange = (e, listName) => {
    const { name, checked } = e.target;
    const updatedList = checked
      ? [...newMedicalRecord[listName], name]
      : newMedicalRecord[listName].filter(item => item !== name);

    setNewMedicalRecord({
      ...newMedicalRecord,
      [listName]: updatedList,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setNewMedicalRecord(prevRecord => ({
      ...prevRecord,
      [name]: value === 'true'
    }));
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
            {/* Descripción no parece necesario */}
            <div>
              <h3>MOTIVO Y EXPECTATIVA</h3>
              <label>
                Motivo Consulta:
                <textarea
                  name="motivoConsulta"
                  value={newMedicalRecord.motivoConsulta}
                  onChange={handleChange}
                  placeholder='Motivo de Consulta'
                  required
                  />
              </label>
              <label>
                Expectativa Paciente:
                <textarea
                  name="expectativaPaciente"
                  value={newMedicalRecord.expectativaPaciente}
                  onChange={handleChange}
                  placeholder='Expectativa del paciente'
                  required
                  />
              </label>
            </div>
            {/*RIESGOS Y ENFERMEDADES SISTEMICAS*/}
            <div>
              <h3>RIESGOS Y ENFERMEDADES SISTÉMICAS</h3>
              <div>
              <label>
                Enfermedad Sistémica:
                <input
                  type='text'
                  name="enfermedadSistemica"
                  value={newMedicalRecord.enfermedadSistemica}
                  onChange={handleChange}
                  placeholder='Enfermedad Sistémica'
                  //required
                  />
              </label>
              </div>

              <div>
              <label>
                Enfermedad Preexistente:
                <input
                type='text'
                  name="enfermedadPreexistente"
                  value={newMedicalRecord.enfermedadPreexistente}
                  onChange={handleChange}
                  placeholder='Enfermedad Preexistente'
                  //required
                  />
              </label>
              </div>

              <div>
              <label>
                Médico Tratante:
                <input
                type='text'
                  name="medicoTratante"
                  value={newMedicalRecord.medicoTratante}
                  onChange={handleChange}
                  placeholder='Médico Tratante'
                  //required
                  />
              </label>
              <label>
                Teléfono Médico Tratante:
                <input
                type='text'
                  name="telMedicoTratante"
                  value={newMedicalRecord.telMedicoTratante}
                  onChange={handleChange}
                  placeholder='Teléfono Médico Tratante'
                  //required
                  />
              </label>
              </div>
            
              <div>
              <label>
                Medicamentos que Consume:
                <textarea
                  name="medicamentosConsume"
                  value={newMedicalRecord.medicamentosConsume}
                  onChange={handleChange}
                  placeholder='Medicamentos que Consume'
                  //required
                  />
              </label>
              <label>
                Alergia a Medicamentos:
                <textarea
                  name="alergiaMedicamentos"
                  value={newMedicalRecord.alergiaMedicamentos}
                  onChange={handleChange}
                  placeholder='Alergia a Medicamentos'
                  //required
                  />
              </label>
              </div>

              <div>
              <label>
                Hábitos Nocivos:
                <div>
                  <input
                    type="checkbox"
                    name="tabaco"
                    checked={newMedicalRecord.habitosNocivos.includes('tabaco')}
                    onChange={(e) => handleCheckboxChange(e, 'habitosNocivos')}
                  />
                  <label for="tabaco">Tabaco</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="alcohol"
                    checked={newMedicalRecord.habitosNocivos.includes('alcohol')}
                    onChange={(e) => handleCheckboxChange(e, 'habitosNocivos')}
                  />
                  <label for="alcohol">Alcohol</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="drogas"
                    checked={newMedicalRecord.habitosNocivos.includes('drogas')}
                    onChange={(e) => handleCheckboxChange(e, 'habitosNocivos')}
                  />
                  <label for="drogas">Drogas</label>
                </div>
              </label>
              </div>
              <div>
              <label>
                Enfermedades Respiratorias:
                <textarea
                  name="enfermedadesRespiratorias"
                  value={newMedicalRecord.enfermedadesRespiratorias}
                  onChange={handleChange}
                  placeholder='Enfermedades Respiratorias'
                  //required
                  />
              </label>
              </div>
              <div>
              <label>
                Enfermedades Hormonales:
                <textarea
                  name="enfermedadesHormonales"
                  value={newMedicalRecord.enfermedadesHormonales}
                  onChange={handleChange}
                  placeholder='Enfermedades Hormonales'
                  //required
                  />
              </label>
              </div>
              <div>
              <label>
                ¿Está gestando?
                <div>
                  <input
                    type="radio"
                    name="estaGestando"
                    value="true"
                    checked={newMedicalRecord.estaGestando === true}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="estaGestando">Sí</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="estaGestando"
                    value="false"
                    checked={newMedicalRecord.estaGestando === false}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="estaGestando">No</label>
                </div>
              </label>

              {newMedicalRecord.estaGestando && (
                <label>
                  Mes de Gestación:
                  <input
                    type="text"
                    name="mesGestacion"
                    value={newMedicalRecord.mesGestacion}
                    onChange={handleChange}
                    placeholder='Mes de Gestación'
                    required
                  />
                </label>
              )}
              </div>
              <div>
              <label>
                ¿Es menor de edad?
                <div>
                  <input
                    type="radio"
                    name="esMenorEdad"
                    value="true"
                    checked={newMedicalRecord.esMenorEdad === true}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="esMenorEdad">Sí</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="esMenorEdad"
                    value="false"
                    checked={newMedicalRecord.esMenorEdad === false}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="esMenorEdad">No</label>
                </div>
              </label>
              
              {newMedicalRecord.esMenorEdad && (
                <label>
                  Nombre del Representante:
                  <input
                    type="text"
                    name="nombreRepresentante"
                    value={newMedicalRecord.nombreRepresentante}
                    onChange={handleChange}
                    placeholder='Nombre del Representante'
                    required
                    />
                </label>           
              )}

              {newMedicalRecord.esMenorEdad && (
              <label>
                Teléfono del Representante:
                <input
                  type="text"
                  name="telRepresentante"
                  value={newMedicalRecord.telRepresentante}
                  onChange={handleChange}
                  placeholder='Teléfono del Representante'
                  required
                  />
              </label>
              )}
              </div>
            </div>

            {/*ESTOMATOLOGICO*/}
            <div>
              <h3>ESTOMATOLOGICO</h3>
              <div>
              <label>
                Última Visita al Dentista:
                <input
                  type="text"
                  name="ultimaVisitaDentista"
                  value={newMedicalRecord.ultimaVisitaDentista}
                  onChange={handleChange}
                  placeholder='Última Visita al Dentista'
                  //required
                  />
              </label>
              </div>
              <div>
              <label>
                Infiltraciones de anestesia previas?:
                <div>
                  <input
                    type="radio"
                    name="infiltracionesAnestesiaPrev"
                    value="true"
                    checked={newMedicalRecord.infiltracionesAnestesiaPrev === true}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="infiltracionesAnestesiaPrev">Sí</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="infiltracionesAnestesiaPrev"
                    value="false"
                    checked={newMedicalRecord.infiltracionesAnestesiaPrev === false}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="infiltracionesAnestesiaPrev">No</label>
                </div>
              </label>

              <label>
                Reacciones adversas a la infiltración de anestesia?:
                <div>
                  <input
                    type="radio"
                    name="reaccionesAdversasInfiltracion"
                    value="true"
                    checked={newMedicalRecord.reaccionesAdversasInfiltracion === true}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="reaccionesAdversasInfiltracion">Sí</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="reaccionesAdversasInfiltracion"
                    value="false"
                    checked={newMedicalRecord.reaccionesAdversasInfiltracion === false}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="reaccionesAdversasInfiltracion">No</label>
                </div>
              </label>

              {newMedicalRecord.reaccionesAdversasInfiltracion && (
                <label>
                  Qué reacción a la infiltración?:
                  <input
                    type="text"
                    name="queReaccionInfiltracion"
                    value={newMedicalRecord.queReaccionInfiltracion}
                    onChange={handleChange}
                    placeholder='Qué Reacción a la Infiltración'
                    required
                    />
                </label>
              )}
              </div>
              <div>
              <label>
                Exodoncia o cirugías bucales o maxilares previas?:
                <div>
                  <input
                    type="radio"
                    name="exodonciaCirugiaPrevias"
                    value="true"
                    checked={newMedicalRecord.exodonciaCirugiaPrevias === true}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="exodonciaCirugiaPrevias">Sí</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="exodonciaCirugiaPrevias"
                    value="false"
                    checked={newMedicalRecord.exodonciaCirugiaPrevias === false}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="exodonciaCirugiaPrevias">No</label>
                </div>
              </label>

              <label>
                Ha tenido complicaciones luego de las cirugías?:
                <div>
                  <input
                    type="radio"
                    name="complicacionesLuegoCirugias"
                    value="true"
                    checked={newMedicalRecord.complicacionesLuegoCirugias === true}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="complicacionesLuegoCirugias">Sí</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="complicacionesLuegoCirugias"
                    value="false"
                    checked={newMedicalRecord.complicacionesLuegoCirugias === false}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="complicacionesLuegoCirugias">No</label>
                </div>
              </label>  

              {newMedicalRecord.complicacionesLuegoCirugias && (
                <label>
                  Qué complicaciones luego de las cirugías?:
                  <input
                    type="text"
                    name="queComplicacionesCirugias"
                    value={newMedicalRecord.queComplicacionesCirugias}
                    onChange={handleChange}
                    placeholder='Qué Complicaciones Luego de Cirugías'
                    required
                    />
                </label>
              )}
              </div>
              <div>
              <label>
                Presenta dificultades para:
                <div>
                  <input
                    type="checkbox"
                    name="masticar"
                    checked={newMedicalRecord.presentaDificultades.includes('masticar')}
                    onChange={(e) => handleCheckboxChange(e, 'presentaDificultades')}
                  />
                  <label for="masticar">Masticar</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="hablar"
                    checked={newMedicalRecord.presentaDificultades.includes('hablar')}
                    onChange={(e) => handleCheckboxChange(e, 'presentaDificultades')}
                  />
                  <label for="hablar">Hablar</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="abrirBoca"
                    checked={newMedicalRecord.presentaDificultades.includes('abrirBoca')}
                    onChange={(e) => handleCheckboxChange(e, 'presentaDificultades')}
                  />
                  <label for="abrirBoca">Abrir la boca</label>
                </div>
              </label>

              <label>
                Otra Dificultad:
                <input
                  type='text'
                  name="otraDificultad"
                  value={newMedicalRecord.otraDificultad}
                  onChange={handleChange}
                  placeholder='Otra Dificultad'
                  //required
                />
              </label>
              </div>
              <div>
              <label>
                Presenta:
                <div>
                  <input
                    type="checkbox"
                    name="supuracion"
                    checked={newMedicalRecord.presenta.includes('supuracion')}
                    onChange={(e) => handleCheckboxChange(e, 'presenta')}
                  />
                  <label for="supuracion">Supuración</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="sangrado"
                    checked={newMedicalRecord.presenta.includes('sangrado')}
                    onChange={(e) => handleCheckboxChange(e, 'presenta')}
                  />
                  <label for="sangrado">Sangrado</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="movilidadDental"
                    checked={newMedicalRecord.presenta.includes('movilidadDental')}
                    onChange={(e) => handleCheckboxChange(e, 'presenta')}
                  />
                  <label for="movilidadDental">Movilidad Dental</label>
                </div>
              </label>
              </div>
            </div>

            {/*ESTADO TEJIDOS BLANDOS*/}
            <div>
              <h3>ESTADO TEJIDOS BLANDOS</h3>
              <div>
              <label>
                Estado de la Lengua:
                <input
                  type='text'
                  name="estadoLengua"
                  value={newMedicalRecord.estadoLengua}
                  onChange={handleChange}
                  placeholder='Estado de la Lengua'
                  //required
                  />
              </label>
              <label>
                Estado de los Labios:
                <input
                  type='text'
                  name="estadoLabios"
                  value={newMedicalRecord.estadoLabios}
                  onChange={handleChange}
                  placeholder='Estado de los Labios'
                  //required
                  />
              </label>
              </div>
              <div>
              <label>
                Estado de los Carrillos:
                <input
                  type='text'
                  name="estadoCarillos"
                  value={newMedicalRecord.estadoCarillos}
                  onChange={handleChange}
                  placeholder='Estado de los Carrillos'
                  //required
                  />
              </label>
              <label>
                Estado del Piso de la Boca:
                <input
                  type='text'
                  name="estadoPisoBoca"
                  value={newMedicalRecord.estadoPisoBoca}
                  onChange={handleChange}
                  placeholder='Estado del Piso de la Boca'
                  //required
                  />
              </label>
              </div>
              <div>
              <label>
                Estado Gingivo-Periodontal:
                <input
                  type='text'
                  name="estadoGingivoPerio"
                  value={newMedicalRecord.estadoGingivoPerio}
                  onChange={handleChange}
                  placeholder='Estado Gingivo-Periodontal'
                  //required
                  />
              </label>
              <label>
                Estado de Enfermedad Periodontal:
                <input
                  type='text'
                  name="estadoEnfermedadPerio"
                  value={newMedicalRecord.estadoEnfermedadPerio}
                  onChange={handleChange}
                  placeholder='Estado de Enfermedad Periodontal'
                  //required
                  />
              </label>
              </div>
            </div>

            {/*ANALISIS OCLUSAL*/}
            <div>
              <h3>ANÁLISIS OCLUSAL</h3>
              <div>
                <h6>DERECHA</h6>
                <label>
                  Análisis Oclusal Derecho RM:
                  <input
                    type='text'
                    name="analisisOclusalDerRM"
                    value={newMedicalRecord.analisisOclusalDerRM}
                    onChange={handleChange}
                    placeholder='Análisis Oclusal Derecho RM'
                    //required
                    />
                </label>
                <label>
                  Análisis Oclusal Derecho RC:
                  <input
                    type='text'
                    name="analisisOclusalDerRC"
                    value={newMedicalRecord.analisisOclusalDerRC}
                    onChange={handleChange}
                    placeholder='Análisis Oclusal Derecho RC'
                    //required
                    />
                </label>

              </div>

              <div>
                <h6>IZQUIERDA</h6>
                <label>
                  Análisis Oclusal Izquierdo RC:
                  <input
                    type='text'
                    name="analisisOclusalIzqRC"
                    value={newMedicalRecord.analisisOclusalIzqRC}
                    onChange={handleChange}
                    placeholder='Análisis Oclusal Izquierdo RC'
                    //required
                    />
                </label>
                <label>
                  Análisis Oclusal Izquierdo RM:
                  <input
                    type='text'
                    name="analisisOclusalIzqRM"
                    value={newMedicalRecord.analisisOclusalIzqRM}
                    onChange={handleChange}
                    placeholder='Análisis Oclusal Izquierdo RM'
                    //required
                    />
                </label>

              </div>
              <div>
              <label>
                Condición Esqueletal:
                <textarea
                  //type='textarea'
                  name="condicionEsqueletal"
                  value={newMedicalRecord.condicionEsqueletal}
                  onChange={handleChange}
                  placeholder='Condición Esquelética'
                  //required
                  />
              </label>
              </div>
              <div>
              <label>
                Diagnóstico Oclusal:
                <textarea
                  //type='textarea'
                  name="diagnosticoOclusal"
                  value={newMedicalRecord.diagnosticoOclusal}
                  onChange={handleChange}
                  placeholder='Diagnóstico Oclusal'
                  //required
                  />
              </label>
              </div>
            </div>

            {/* Botón de envío */}
            <div>
              <button type="submit">Crear Historia Clínica</button>
            </div>
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
