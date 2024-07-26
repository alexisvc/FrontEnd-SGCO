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


export const generatePDF = async (patientId) => {
    try {
        // Obtener detalles del paciente
        const patient = await patientsService.getPatientById(patientId);

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

        let ortodoncia = null;
        try {
            ortodoncia = await ortodonciaService.getOrtodonciasByPatientId(patientId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("ortodoncia not found for patient ID:", patientId);
            } else {
                console.error("Error fetching ortodoncia:", error);
                throw error;  // Rethrow if it's a different error
            }
        }
        // Obtener planes de tratamiento del paciente
        let evolucionesOrtodoncia = [];
        try {
            evolucionesOrtodoncia = await evolucionOrtodonciaService.getByOrtodonciaId(ortodoncia._id);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("endodonticTreatments not found for patient ID:", patientId);
            } else {
                console.error("Error fetching endodonticTreatments:", error);
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
            addText(`Antecedentes: ${cirugiaPatologia.antecedentesCirPat}`, 10);
            addText(`Alergias Médicas: ${cirugiaPatologia.alergiasMedCirPat}`, 10);
            addText(`Patología de Tejidos Blandos: ${cirugiaPatologia.patologiaTejBland}`, 10);
            addText(`Patología de Tejidos Duros: ${cirugiaPatologia.patologiaTejDuros}`, 10);
            addText(`Diagnóstico Radiográfico: ${cirugiaPatologia.diagRadiografico}`, 10);
            addText(`Localización de la Patología: ${cirugiaPatologia.localizacionPatologia}`, 10);
            addText(`Archivo RX: ${cirugiaPatologia.archivo1Url}`, 10);
            addText(`Archivo CS: ${cirugiaPatologia.archivo2Url}`, 10);
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



        // Guardar el documento PDF
        doc.save(`Patient_Details_${patientId}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};
