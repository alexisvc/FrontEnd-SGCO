import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import patientsService from '../../services/patients';
import medicalRecordsService from '../../services/medicalRecordsService';
import treatmentPlansService from '../../services/patientTreatmentService';
import evolutionChartService from '../../services/evolutionChartService';
import cirugiaPatologiaService from '../../services/cirugiaPatologiaService';
import endodonticTreatmentService from '../../services/endodonticTreatmentService';
import ortodonciaService from '../../services/ortodonciaService';
import evolucionOrtodonciaService from '../../services/evolucionOrtodonciaService';
import rehabilitacionOralService from '../../services/rehabilitacionOralService';
import disfuncionMandibularService from '../../services/disfuncionMandibularService';
import periodonticTreatmentService from '../../services/periodonticTreatmentService';


export const generatePDF = async (patientId) => {
    try {
        // Obtener detalles del paciente
        let patient = await patientsService.getPatientById(patientId);

        // Obtener registros médicos del paciente
        let medicalRecord = null;
        try {
            medicalRecord = await medicalRecordsService.getMedicalRecordsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Medical record not found for patient ID:", patientId);
            } else {
                console.error("Error fetching medical record:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener planes de tratamiento del paciente
        let treatmentPlans = [];
        try {
            treatmentPlans = await treatmentPlansService.getByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Treatment plans not found for patient ID:", patientId);
            } else {
                console.error("Error fetching treatment plans:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener planes de tratamiento del paciente
        let evolutionCharts = [];
        try {
            evolutionCharts = await evolutionChartService.getEvolutionChartsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Treatment plans not found for patient ID:", patientId);
            } else {
                console.error("Error fetching treatment plans:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener registros médicos del paciente
        let cirugiaPatologia = null;
        try {
            cirugiaPatologia = await cirugiaPatologiaService.getCirugiaPatologiaByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Cirugia Patologia not found for patient ID:", patientId);
            } else {
                console.error("Error fetching Cirugia Patologia:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener planes de tratamiento del paciente
        let endodonticTreatments = [];
        try {
            endodonticTreatments = await endodonticTreatmentService.getEndodonticTreatmentsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("endodonticTreatments not found for patient ID:", patientId);
            } else {
                console.error("Error fetching endodonticTreatments:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

       // Obtener ortodoncia del paciente
        let ortodoncia = null;
        try {
            ortodoncia = await ortodonciaService.getOrtodonciasByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("Ortodoncia not found for patient ID:", patientId);
            } else {
                console.error("Error fetching ortodoncia:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener planes de tratamiento del paciente solo si existe la ortodoncia
        let evolucionesOrtodoncia = [];
        if (ortodoncia) {
            try {
                evolucionesOrtodoncia = await evolucionOrtodonciaService.getByOrtodonciaId(ortodoncia._id);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn("Evoluciones de ortodoncia not found for ortodoncia ID:", ortodoncia._id);
                } else {
                    console.error("Error fetching evoluciones de ortodoncia:", error);
                    throw error;  // Rethrow if it's a different error
                }
            }
        }

        // Obtener ortodoncia del paciente
        let rehabilitacionOral = null;
        try {
            rehabilitacionOral = await rehabilitacionOralService.getRehabilitacionOralByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("rehabilitacionOral not found for patient ID:", patientId);
            } else {
                console.error("Error fetching rehabilitacionOral:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener ortodoncia del paciente
        let disfuncionMandibular = null;
        try {
            disfuncionMandibular = await disfuncionMandibularService.getDisfuncionMandibularByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("rehabilitacionOral not found for patient ID:", patientId);
            } else {
                console.error("Error fetching rehabilitacionOral:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Obtener ortodoncia del paciente
        let periodoncia = null;
        try {
            periodoncia = await periodonticTreatmentService.getPeriodonticTreatmentsByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("periodoncia not found for patient ID:", patientId);
            } else {
                console.error("Error fetching periodoncia:", error);
                throw error;  // Rethrow if it's a different error
            }
        }

        // Crear un nuevo documento PDF
        const doc = new jsPDF();
        let yPos = 20;  // Posición inicial en la página

        // Función para agregar texto y manejar salto de página si es necesario
        const addText = (text, yOffset) => {
            if (yPos + yOffset > 280) {  // Ajustar este valor según el margen que quieras en el borde inferior
                doc.addPage();
                yPos = 20;  // Reiniciar posición para nueva página
            }
            doc.text(text, 20, yPos);
            yPos += yOffset;
        };

        // Agregar título
        doc.setFontSize(20);
        addText("MP ESPECIALIDADES ODONTOLÓGICAS", 10);

        // Agregar detalles del paciente
        doc.setFontSize(12);
        addText("Detalles del Paciente:", 10);
        addText(`Nombre: ${patient.nombrePaciente}`, 10);
        addText(`Edad: ${patient.edadPaciente}`, 10);
        addText(`Fecha de Nacimiento: ${new Date(patient.fechaNacimiento).toLocaleDateString()}`, 10);
        addText(`Correo: ${patient.correoPaciente}`, 10);
        addText(`Dirección: ${patient.direccionPaciente}`, 10);
        addText(`Género: ${patient.generoPaciente}`, 10);
        addText(`Número de Cédula: ${patient.numeroCedula}`, 10);
        addText(`Ocupación: ${patient.ocupacion}`, 10);
        addText(`Teléfono: ${patient.telefono}`, 10);
        addText(`Teléfono de Contacto de Emergencia: ${patient.telContactoEmergencia}`, 10);
        addText(`Afinidad de Contacto de Emergencia: ${patient.afinidadContactoEmergencia}`, 10);

        // Agregar historia clinica si existe
        if (medicalRecord) {
            // Agregar detalles del registro médico
            addText("Registro Médico:", 10);
            addText(`Fecha: ${new Date(medicalRecord.date).toLocaleDateString()}`, 10);
            addText(`Descripción: ${medicalRecord.description}`, 10);
            addText(`Motivo de Consulta: ${medicalRecord.motivoConsulta || 'N/A'}`, 10);
            addText(`Expectativa del Paciente: ${medicalRecord.expectativaPaciente || 'N/A'}`, 10);
            addText(`Enfermedad Sistémica: ${medicalRecord.enfermedadSistemica || 'N/A'}`, 10);
            addText(`Enfermedad Preexistente: ${medicalRecord.enfermedadPreexistente || 'N/A'}`, 10);
            addText(`Médico Tratante: ${medicalRecord.medicoTratante || 'N/A'}`, 10);
            addText(`Teléfono del Médico Tratante: ${medicalRecord.telMedicoTratante || 'N/A'}`, 10);
            addText(`Medicamentos que Consume: ${medicalRecord.medicamentosConsume || 'N/A'}`, 10);
            addText(`Alergia a Medicamentos: ${medicalRecord.alergiaMedicamentos || 'N/A'}`, 10);
            addText(`Hábitos Nocivos: ${medicalRecord.habitosNocivos.join(', ') || 'N/A'}`, 10);
            addText(`Enfermedades Respiratorias: ${medicalRecord.enfermedadesRespiratorias || 'N/A'}`, 10);
            addText(`Enfermedades Hormonales: ${medicalRecord.enfermedadesHormonales || 'N/A'}`, 10);
            addText(`Está Gestando: ${medicalRecord.estaGestando ? 'Sí' : 'No'}`, 10);
            addText(`Mes de Gestación: ${medicalRecord.mesGestacion || 'N/A'}`, 10);
            addText(`Es Menor de Edad: ${medicalRecord.esMenorEdad ? 'Sí' : 'No'}`, 10);
            addText(`Nombre del Representante: ${medicalRecord.nombreRepresentante || 'N/A'}`, 10);
            addText(`Teléfono del Representante: ${medicalRecord.telRepresentante || 'N/A'}`, 10);
            addText(`Última Visita al Dentista: ${medicalRecord.ultimaVisitaDentista || 'N/A'}`, 10);
            addText(`Infiltraciones de Anestesia Previas: ${medicalRecord.infiltracionesAnestesiaPrev ? 'Sí' : 'No'}`, 10);
            addText(`Reacciones Adversas a Infiltraciones: ${medicalRecord.reaccionesAdversasInfiltracion ? 'Sí' : 'No'}`, 10);
            addText(`Qué Reacción: ${medicalRecord.queReaccionInfiltracion || 'N/A'}`, 10);
            addText(`Exodoncia/Cirugía Previas: ${medicalRecord.exodonciaCirugiaPrevias ? 'Sí' : 'No'}`, 10);
            addText(`Complicaciones Luego de Cirugías: ${medicalRecord.complicacionesLuegoCirugias ? 'Sí' : 'No'}`, 10);
            addText(`Qué Complicaciones: ${medicalRecord.queComplicacionesCirugias || 'N/A'}`, 10);
            addText(`Presenta Dificultades: ${medicalRecord.presentaDificultades.join(', ') || 'N/A'}`, 10);
            addText(`Otra Dificultad: ${medicalRecord.otraDificultad || 'N/A'}`, 10);
            addText(`Presenta: ${medicalRecord.presenta.join(', ') || 'N/A'}`, 10);
            addText(`Estado de la Lengua: ${medicalRecord.estadoLengua || 'N/A'}`, 10);
            addText(`Estado de los Labios: ${medicalRecord.estadoLabios || 'N/A'}`, 10);
            addText(`Estado de los Carrillos: ${medicalRecord.estadoCarillos || 'N/A'}`, 10);
            addText(`Estado del Piso de Boca: ${medicalRecord.estadoPisoBoca || 'N/A'}`, 10);
            addText(`Estado Gingivo-Periodontal: ${medicalRecord.estadoGingivoPerio || 'N/A'}`, 10);
            addText(`Estado de Enfermedad Periodontal: ${medicalRecord.estadoEnfermedadPerio || 'N/A'}`, 10);
            addText(`Análisis Oclusal Derecho RM: ${medicalRecord.analisisOclusalDerRM || 'N/A'}`, 10);
            addText(`Análisis Oclusal Derecho RC: ${medicalRecord.analisisOclusalDerRC || 'N/A'}`, 10);
            addText(`Análisis Oclusal Izquierdo RM: ${medicalRecord.analisisOclusalIzqRM || 'N/A'}`, 10);
            addText(`Análisis Oclusal Izquierdo RC: ${medicalRecord.analisisOclusalIzqRC || 'N/A'}`, 10);
            addText(`Condición Esqueletal: ${medicalRecord.condicionEsqueletal || 'N/A'}`, 10);
            addText(`Diagnóstico Oclusal: ${medicalRecord.diagnosticoOclusal || 'N/A'}`, 10);
        }

        // Agregar planes de tratamiento si existen
        if (treatmentPlans.length > 0) {
            addText("Plan de tratamientos:", 10);
            // Preparar datos para la tabla
            const tableData = treatmentPlans.map(plan => [
                plan.cita,
                plan.actividadPlanTrat,
                new Date(plan.fechaPlanTrat).toLocaleDateString(),
                plan.montoAbono
            ]);

            // Agregar tabla al PDF
            autoTable(doc, {
                head: [['Cita', 'Actividad del Plan de Tratamiento', 'Fecha del Plan', 'Monto Abono']],
                body: tableData,
                startY: yPos
            });
            yPos = doc.lastAutoTable.finalY + 10;  // Ajustar posición después de la tabla
        }

        // Agregar cuadros de evolución si existen
        if (evolutionCharts.length > 0) {
            addText("Cuadro de evolución:", 10);
            // Preparar datos para la tabla
            const tableData = evolutionCharts.map(evolution => [
                new Date(evolution.fechaCuadEvol).toLocaleDateString(),
                evolution.actividadCuadEvol,
                evolution.recomendacionCuadEvol,
                evolution.firmaOdon,
                evolution.firmaPaciente
            ]);

            // Agregar tabla al PDF
            autoTable(doc, {
                head: [['Fecha', 'Actividad Clínica	', 'Recomendación', 'Firma Odontólogo', 'Firma Paciente']],
                body: tableData,
                startY: yPos
            });
            yPos = doc.lastAutoTable.finalY + 10;  // Ajustar posición después de la tabla
        }

        // Agregar cirugía patología si existe
        if (cirugiaPatologia) {
            doc.setFontSize(20);
            addText("Cirugía y Patología Oral", 10);
            // Agregar detalles de cada tratamiento de endodoncia
            doc.setFontSize(12);
            cirugiaPatologia.forEach((cirugiaPatologia, index) => {
                addText(`Cirugía y Patología Oral ${index + 1}:`, 10);
            addText(`Antecedentes: ${cirugiaPatologia.antecedentesCirPat}`, 10);
            addText(`Alergias Médicas: ${cirugiaPatologia.alergiasMedCirPat}`, 10);
            addText(`Patología de Tejidos Blandos: ${cirugiaPatologia.patologiaTejBland}`, 10);
            addText(`Patología de Tejidos Duros: ${cirugiaPatologia.patologiaTejDuros}`, 10);
            addText(`Diagnóstico Radiográfico: ${cirugiaPatologia.diagRadiografico}`, 10);
            addText(`Localización de la Patología: ${cirugiaPatologia.localizacionPatologia}`, 10);
            addText(`Archivo RX: ${cirugiaPatologia.archivo1Url}`, 10);
            addText(`Archivo CS: ${cirugiaPatologia.archivo2Url}`, 10);
            });
        }

        // Agregar endodoncias si existen
        if (endodonticTreatments) {
            doc.setFontSize(20);
            addText("Tratamientos de Endodoncia", 10);
            // Agregar detalles de cada tratamiento de endodoncia
            doc.setFontSize(12);
            endodonticTreatments.forEach((treatment, index) => {
                addText(`Tratamiento de Endodoncia ${index + 1}:`, 10);
                addText(`Diente: ${treatment.dienteEnd}`, 10);
                addText(`Grapa: ${treatment.grapaEnd}`, 10);
                addText(`Diagnóstico Dental: ${treatment.diagDental}`, 10);
                addText(`Diagnóstico Pulpar: ${treatment.diagPulpar}`, 10);
                addText(`Intervención Indicada: ${treatment.intervencionIndicada}`, 10);
                addText(`Técnica de Obturación: ${treatment.tecnicaObturacion}`, 10);
                addText(`Número de Conductos: ${treatment.numConductos}`, 10);
                addText(`Observaciones Anatómicas: ${treatment.obsAnatomicas}`, 10);
                addText(`Etiología: ${treatment.etiologia.join(', ')}`, 10);
                addText(`Dolor: ${treatment.dolor.join(', ')}`, 10);
                addText(`Pruebas Clínicas: ${treatment.pruebasClinicas.join(', ')}`, 10);
                addText(`Pruebas de Vitalidad: ${treatment.pruebasVitalidad.join(', ')}`, 10);
                addText(`Cámara Pulpar: ${treatment.camaraPulpar.join(', ')}`, 10);
                addText(`Conductos Radiculares: ${treatment.conductosRadiculares.join(', ')}`, 10);
                addText(`Foramen: ${treatment.foramen.join(', ')}`, 10);
                addText(`Ligamento Periodontal: ${treatment.ligamentoPeriodontal.join(', ')}`, 10);
                addText(`Otros Hallazgos: ${treatment.otrosHallazgos}`, 10);
                addText(`Conductometría Tentativa: ${treatment.conductometriaTentativa}`, 10);
                addText(`Conductometría Definitiva: ${treatment.conductometriaDefinitiva}`, 10);
                addText(`Técnica de Instrumentación: ${treatment.tecnicaInstrumentacion}`, 10);
                addText(`Medicación Intra: ${treatment.medicacionIntra}`, 10);
                addText(`Archivo RX: ${treatment.archivo1Url}`, 10);
                addText(`Archivo CS: ${treatment.archivo2Url}`, 10);
            });
        }
        
        // Agregar ortodoncia si existe
        if (ortodoncia) {
            doc.setFontSize(20);
            addText("Ortodoncia", 10);
            // Agregar detalles de cada tratamiento de endodoncia
            doc.setFontSize(12);
            addText(`Diagnóstico: ${ortodoncia.diagnostico}`, 10);
            addText(`Objetivo: ${ortodoncia.objetivo}`, 10);
            addText(`Tiempo Aproximado: ${ortodoncia.tiempoAproximado}`, 10);
            addText(`Tipo de Bracket: ${ortodoncia.tipoBracket}`, 10);
            addText(`Aparato Ortopédico: ${ortodoncia.aparatoOrtopedico}`, 10);
            addText(`Observaciones: ${ortodoncia.observaciones}`, 10);
            addText(`Archivo RX: ${ortodoncia.archivo1Url}`, 10);
            addText(`Archivo CS: ${ortodoncia.archivo2Url}`, 10);
            addText(`Archivo C: ${ortodoncia.archivo3Url}`, 10);
        }

        // Agregar evoluciones de ortodoncia si existen
        if (evolucionesOrtodoncia.length > 0) {
            doc.setFontSize(16);
            addText("Evoluciones Ortodoncia:", 10);
            // Preparar datos para la tabla
            doc.setFontSize(12);
            const tableData = evolucionesOrtodoncia.map(evolucion => [
                new Date(evolucion.fechaEvolucion).toLocaleDateString(),
                evolucion.evolucion,
                evolucion.arcoEvolucion
            ]);

            // Agregar tabla al PDF
            autoTable(doc, {
                head: [['Fecha', 'Evolución', 'Arco']],
                body: tableData,
                startY: yPos
            });
            yPos = doc.lastAutoTable.finalY + 10;  // Ajustar posición después de la tabla
        }

        // Agregar detalles de rehabilitación oral si existe
        if (rehabilitacionOral) {
            doc.setFontSize(20);
            addText("Rehabilitación Oral", 10);

            // Agregar detalles de cada campo de rehabilitación oral
            doc.setFontSize(12);
            addText(`Referencias Horizontales: ${rehabilitacionOral.refHorizontal.join(', ')}`, 10);
            addText(`Referencias Verticales: ${rehabilitacionOral.refVertical.join(', ')}`, 10);
            addText(`Longitud del Labio: ${rehabilitacionOral.longitudLabio.join(', ')}`, 10);
            addText(`Forma del Labio: ${rehabilitacionOral.formaLabio.join(', ')}`, 10);
            addText(`Exposición de la Sonrisa: ${rehabilitacionOral.exposicionSonrisa.join(', ')}`, 10);
            addText(`Corredor Bucal: ${rehabilitacionOral.corredorBucal.join(', ')}`, 10);
            addText(`Orientación del Plano Oclusal Anterior: ${rehabilitacionOral.orientacionPlanoOclusalAnt.join(', ')}`, 10);
            addText(`Visibilidad del Borde Superior: ${rehabilitacionOral.visibilidadBordeSup}`, 10);
            addText(`Orientación del Plano Oclusal Posterior: ${rehabilitacionOral.orientacionPlanoOclusalPost.join(', ')}`, 10);
            addText(`Ancho del Incisivo Central Superior: ${rehabilitacionOral.anchoIncisivoCentalSup}`, 10);
            addText(`Longitud: ${rehabilitacionOral.longitud}`, 10);
            addText(`Color de los Dientes: ${rehabilitacionOral.colorDientes}`, 10);
            addText(`Simetría Gingival: ${rehabilitacionOral.simetriaGingival.join(', ')}`, 10);
            addText(`Biotipo Periodontal: ${rehabilitacionOral.biotipoPeriodental.join(', ')}`, 10);
            addText(`Número de Dientes: ${rehabilitacionOral.numeroDiente.join(', ')}`, 10);
            addText(`Pérdida de Hueso Periodontal: ${rehabilitacionOral.perdidaHuesoPeriodental.join(', ')}`, 10);
            addText(`Otras Patologías Óseas: ${rehabilitacionOral.otrasPatologiasOseas}`, 10);
            addText(`Restricción de Vías Respiratorias: ${rehabilitacionOral.restriccionViasRespiratorias}`, 10);
            addText(`Relación Incisal: ${rehabilitacionOral.relacionIncisal.join(', ')}`, 10);
            addText(`Overbite: ${rehabilitacionOral.overbite.join(', ')}`, 10);
            addText(`Overjet: ${rehabilitacionOral.overjet.join(', ')}`, 10);
            addText(`Tinitus: ${rehabilitacionOral.tinitus.join(', ')}`, 10);
            addText(`Puede Repetir la Mordida: ${rehabilitacionOral.puedeRepetirMordida.join(', ')}`, 10);
            addText(`Restauraciones Defectuosas: ${rehabilitacionOral.restauracionesDefectuosas ? 'Sí' : 'No'}`, 10);
            if (rehabilitacionOral.restauracionesDefectuosas) {
                addText(`Restauraciones Defectuosas Cuáles: ${rehabilitacionOral.restauracionesDefectuosasCuales}`, 10);
            }
            addText(`Lesiones Cariosas: ${rehabilitacionOral.lesionesCariosas ? 'Sí' : 'No'}`, 10);
            if (rehabilitacionOral.lesionesCariosas) {
                addText(`Lesiones Cariosas Cuáles: ${rehabilitacionOral.lesionesCariosasCuales}`, 10);
            }
            addText(`Dientes Faltantes: ${rehabilitacionOral.dientesFaltantes ? 'Sí' : 'No'}`, 10);
            if (rehabilitacionOral.dientesFaltantes) {
                addText(`Dientes Faltantes Cuáles: ${rehabilitacionOral.dientesFaltantesCuales}`, 10);
            }
            addText(`Corona Dental: ${rehabilitacionOral.coronaDental ? 'Sí' : 'No'}`, 10);
            if (rehabilitacionOral.coronaDental) {
                addText(`Corona Dental Cuáles: ${rehabilitacionOral.coronaDentalCuales}`, 10);
            }
            addText(`Espigos: ${rehabilitacionOral.espigos ? 'Sí' : 'No'}`, 10);
            if (rehabilitacionOral.espigos) {
                addText(`Espigos Cuáles: ${rehabilitacionOral.espigosCuales}`, 10);
            }
            addText(`Espigos 2: ${rehabilitacionOral.espigos2.join(', ')}`, 10);
            addText(`Implantes: ${rehabilitacionOral.implantes ? 'Sí' : 'No'}`, 10);
            if (rehabilitacionOral.implantes) {
                addText(`Implantes Cuáles: ${rehabilitacionOral.implantesCuales}`, 10);
            }
            addText(`Edéntulo Parcial: ${rehabilitacionOral.edentuloParcial.join(', ')}`, 10);
            addText(`Clasificación de Kennedy: ${rehabilitacionOral.clasificacionDeKenedy}`, 10);
            addText(`Edéntulo Total: ${rehabilitacionOral.edentuloTotal.join(', ')}`, 10);
            addText(`Diagnóstico Oclusal: ${rehabilitacionOral.diagnosticoOclusal}`, 10);
            addText(`Archivo RX: ${rehabilitacionOral.archivo1Url}`, 10);
            addText(`Archivo CS: ${rehabilitacionOral.archivo2Url}`, 10);
            addText(`Archivo C: ${rehabilitacionOral.archivo3Url}`, 10);
        }

        //Agregar disfuncion mandibular si existe
        if (disfuncionMandibular) {
            doc.setFontSize(20);
            addText("Disfunción Mandibular", 10);

            // Agregar detalles de cada campo de disfunción mandibular
            doc.setFontSize(12);
            addText(`Hueso Cortical: ${disfuncionMandibular.huesoCortical ? 'Sí' : 'No'}`, 10);
            addText(`Espacio Articular: ${disfuncionMandibular.espacioArticular ? 'Sí' : 'No'}`, 10);
            addText(`Cóndilo: ${disfuncionMandibular.condillo ? 'Sí' : 'No'}`, 10);
            addText(`Desviación de la Línea Media: ${disfuncionMandibular.desviacionLineaMedia ? 'Sí' : 'No'}`, 10);
            addText(`Con Reducción: ${disfuncionMandibular.conReduccion ? 'Sí' : 'No'}`, 10);
            addText(`Sin Reducción: ${disfuncionMandibular.sinReduccion ? 'Sí' : 'No'}`, 10);
            addText(`Click Articular: ${disfuncionMandibular.clickArticular ? 'Sí' : 'No'}`, 10);
            addText(`Crepitación: ${disfuncionMandibular.crepitacion ? 'Sí' : 'No'}`, 10);
            addText(`Subluxación: ${disfuncionMandibular.subluxacion ? 'Sí' : 'No'}`, 10);
            addText(`Dolor Articular Derecho: ${disfuncionMandibular.dolorArticularDer.join(', ')}`, 10);
            addText(`Dolor Articular Izquierdo: ${disfuncionMandibular.dolorArticularIzq.join(', ')}`, 10);
            addText(`Dolor Muscular Izquierdo: ${disfuncionMandibular.dolorMuscularIzq.join(', ')}`, 10);
            addText(`Dolor Muscular Derecho: ${disfuncionMandibular.dolorMuscularDer.join(', ')}`, 10);
            addText(`Dolor Muscular: ${disfuncionMandibular.dolorMuscular.join(', ')}`, 10);
            addText(`Descripción del Dolor Muscular: ${disfuncionMandibular.dolorMuscularDescripcion}`, 10);
            addText(`Dolor Orofacial Común Muscular: ${disfuncionMandibular.dolorOrofacialComunMuscular.join(', ')}`, 10);
            addText(`Mallampati: ${disfuncionMandibular.mallampati.join(', ')}`, 10);
            addText(`Dolor Orofacial Común Apnea: ${disfuncionMandibular.dolorOrofacialComunApnea.join(', ')}`, 10);
        }

        // Agregar detalles de periodoncia si existen
        if (periodoncia) {
            doc.setFontSize(20);
            addText("Periodoncia", 10);
        
            // Detalles individuales
            doc.setFontSize(12);
            addText(`Diagnóstico: ${periodoncia.diagnosticoPer}`, 10);
            addText(`Observación: ${periodoncia.observacionPer}`, 10);
            addText(`Archivo 1: ${periodoncia.archivo1Url}`, 10);
            addText(`Archivo 2: ${periodoncia.archivo2Url}`, 10);
        
            yPos += 40; // Ajustar posición después de los textos individuales
            
            doc.setFontSize(18);
            addText('Inferior', 10); // Espacio entre texto y tabla
            // Datos para los campos con 16 columnas
            const fieldsInferior = [
                { label: 'Movilidad', values: periodoncia.movilidadInferior },
                { label: 'Furca', values: periodoncia.furcaInferior },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalInferiorA },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeInferiorA },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionInferiorA },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalInferiorB },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeInferiorB },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionInferiorB }
            ];
        
            // Crear datos para la tabla agrupada
            const tableData = fieldsInferior.map(field => {
                const row = [field.label];
                for (let i = 0; i < 16; i++) {
                    row.push(field.values[i] || ''); // Agregar datos o celdas vacías si no hay más datos
                }
                return row;
            });
        
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableData,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });
            
            const fieldsInferiorEspeciales = [
                { label: 'Sangrado', values: periodoncia.sangradoInferior },
                { label: 'Placa', values: periodoncia.placaInferior },
            ];
            
            // Crear datos para la tabla agrupada
            const tableDataInferiorEspeciales = fieldsInferiorEspeciales.map(field => {
                const row = [field.label];
                const data = field.values;
            
                // Crear filas agrupando los datos en 3 por columna
                for (let i = 0; i < 16; i++) {
                    const index = i * 3;
                    const cellData = [
                        data[index] || '',
                        data[index + 1] || '',
                        data[index + 2] || ''
                    ].join(', '); // Concatenar los tres elementos en una sola cadena
                    row.push(cellData);
                }
            
                return row;
            });
            
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableDataInferiorEspeciales,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });
            

            doc.setFontSize(18);
            addText('Superior', 10);
            // Datos para los campos con 16 columnas
            const fieldsSuperior = [
                { label: 'Movilidad', values: periodoncia.movilidadSuperior },
                { label: 'Furca', values: periodoncia.furcaSuperior },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalSuperiorA },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeSuperiorA },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionSuperiorA },
                { label: 'Margen Gingival', values: periodoncia.mrgGingivalSuperiorB },
                { label: 'Profundidad de Sondaje', values: periodoncia.profundidadSondajeSuperiorB },
                { label: 'Nivel de Inserción', values: periodoncia.nivelInsercionSuperiorB }
            ];
        
            // Crear datos para la tabla agrupada
            const tableDataSuperior = fieldsSuperior.map(field => {
                const row = [field.label];
                for (let i = 0; i < 16; i++) {
                    row.push(field.values[i] || ''); // Agregar datos o celdas vacías si no hay más datos
                }
                return row;
            });
        
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableDataSuperior,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });

            const fieldsSuperiorEspeciales = [
                { label: 'Sangrado', values: periodoncia.sangradoSuperior },
                { label: 'Placa', values: periodoncia.placaSuperior },
            ];
            
            // Crear datos para la tabla agrupada
            const tableDataSuperiorEspeciales = fieldsSuperiorEspeciales.map(field => {
                const row = [field.label];
                const data = field.values;
            
                // Crear filas agrupando los datos en 3 por columna
                for (let i = 0; i < 16; i++) {
                    const index = i * 3;
                    const cellData = [
                        data[index] || '',
                        data[index + 1] || '',
                        data[index + 2] || ''
                    ].join(', '); // Concatenar los tres elementos en una sola cadena
                    row.push(cellData);
                }
            
                return row;
            });
            
            // Agregar la tabla al PDF
            autoTable(doc, {
                head: [
                    ['', '4.8', '4.7', '4.6', '4.5', '4.4', '4.3', '4.2', '4.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']
                ],
                body: tableDataSuperiorEspeciales,
                startY: yPos,
                didDrawPage: function (data) {
                    yPos = data.cursor.y + 10;  // Ajustar posición después de la tabla
                }
            });
        
            yPos = doc.lastAutoTable.finalY + 10; // Ajustar yPos si la tabla se divide en varias páginas
    
        }
    
        // Guardar el documento PDF
        doc.save(`Patient_Details_${patientId}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};
