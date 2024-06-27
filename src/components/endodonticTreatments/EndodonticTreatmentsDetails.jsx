import React, { useState } from 'react';
import EditEndodonticTreatmentsForm from "./EditEndodonticTreatmentsForm";
import CreateEndodonticTreatmentsForm from "./CreateEndodonticTreatmentsForm";
import { 
  Button, 
  Typography, 
  Container,
  Paper, 
  Box
} from '@mui/material';

const EndodonticTreatmentsDetails = ({ 
  patientId, 
  endodonticTreatments,
  createEndodonticTreatment,
  updateEndodonticTreatment,
  fetchEndodonticTreatments,
}) => {
  const [showEditFormId, setShowEditFormId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateEndodonticTreatments = async (formData) => {
    const newEndodonticTreamentData = {
      ...formData,
      paciente: patientId,
    };
    await createEndodonticTreatment(newEndodonticTreamentData);
    setShowCreateForm(false);
  };

  const handleUpdateEndodonticTreatments = async (id, formData) => {
    await updateEndodonticTreatment(id, formData);
    setShowEditFormId(null);
  };

  const toggleEditForm = (id) => {
    setShowEditFormId(showEditFormId === id ? null : id);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <>
      <Container component={Paper}>
        <Typography align='center' variant="h4" sx={{margin: 3}}>Endodoncias</Typography>
        
        {endodonticTreatments.map((treatment) => (
          <div key={treatment.id}>
            <Box display="flex" justifyContent="center">
              <Button sx={{margin: 1}} variant="contained" color="primary" onClick={() => toggleEditForm(treatment.id)}>
                {showEditFormId === treatment.id ? 'Ocultar HC Endodoncia' : 'Ver HC Endodoncia'}
              </Button>
            </Box>
            {showEditFormId === treatment.id && (
              <EditEndodonticTreatmentsForm 
                endodonticTreatmentsId={treatment.id}
                endodonticTreatmentsData={{
                  dienteEnd: treatment.dienteEnd,
                  grapaEnd: treatment.grapaEnd,
                  diagDental: treatment.diagDental,
                  diagPulpar: treatment.diagPulpar,
                  intervencionIndicada: treatment.intervencionIndicada,
                  tecnicaObturacion: treatment.tecnicaObturacion,
                  numConductos: treatment.numConductos,
                  obsAnatomicas: treatment.obsAnatomicas,
                  etiologia: treatment.etiologia,
                  dolor: treatment.dolor,
                  pruebasClinicas: treatment.pruebasClinicas,
                  pruebasVitalidad: treatment.pruebasVitalidad,
                  camaraPulpar: treatment.camaraPulpar,
                  conductosRadiculares: treatment.conductosRadiculares,
                  foramen: treatment.foramen,
                  ligamentoPeriodontal: treatment.ligamentoPeriodontal,
                  otrosHallazgos: treatment.otrosHallazgos,
                  conductometriaTentativa: treatment.conductometriaTentativa,
                  conductometriaDefinitiva: treatment.conductometriaDefinitiva,
                  tecnicaInstrumentacion: treatment.tecnicaInstrumentacion,
                  medicacionIntra: treatment.medicacionIntra,
                }} 
                updateEndodonticTreatments={handleUpdateEndodonticTreatments}
              />
            )}
          </div>
        ))}
        
        <Box display="flex" justifyContent="center">
          <Button sx={{margin: 1}} onClick={toggleCreateForm} variant="contained" color="primary">
            {showCreateForm ? 'Ocultar Crear HC Endodoncia' : 'Crear HC Endodoncia'}
          </Button>
        </Box>
        {showCreateForm && (
          <CreateEndodonticTreatmentsForm
            patientId={patientId}
            createEndodonticTreatment={handleCreateEndodonticTreatments}
          />
        )}
      </Container>
    </>
  );
};

export default EndodonticTreatmentsDetails;
