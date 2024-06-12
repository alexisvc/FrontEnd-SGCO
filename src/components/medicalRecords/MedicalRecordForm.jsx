import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MedicalRecordForm = ({ patientId, updateMedicalRecord, patientMedicalRecord }) => {

  const [newMedicalRecord, setNewMedicalRecord] = useState({
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
    habitosNocivos: patientMedicalRecord.habitosNocivos,
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
    setNewMedicalRecord((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? (checked ? true : false) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMedicalRecord(patientMedicalRecord.id, newMedicalRecord);
    navigate("/patients");
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

  return (
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
              <button type="submit">Guardar Historia Clínica</button>
            </div>
          </form>
        </div>
  );
};

export default MedicalRecordForm;
