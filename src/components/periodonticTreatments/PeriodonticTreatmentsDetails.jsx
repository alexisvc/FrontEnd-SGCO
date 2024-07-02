import React, { useState } from 'react';
import CreatePeriodonticTreatmentsForm from './CreatePeriodonticTreatmentsForm';
import EditPeriodonticTreatmentsForm from './EditPeriodonticTreatmentsForm';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const PeriodonticTreatmentsDetails = ({ 
  patientId, 
  periodonticTreatments,
  createPeriodonticTreatment,
  updatePeriodonticTreatment,
  fetchPeriodonticTreatment,
}) => {


  const handleCreatePeriodonticTreatments = async (formData) => {
    const newPeriodonticTreamentData = {
      ...formData,
      paciente: patientId,
    };
    await createPeriodonticTreatment(newPeriodonticTreamentData);
  };

  const handleUpdatePeriodonticTreatments = async (id, formData) => {
    await updatePeriodonticTreatment(id, formData);
  };

  

  return (
    <>
      <Container component={Paper}>
        <Typography align='center' variant="h4" sx={{margin: 3}}>Periodoncia</Typography>
        
        
        {periodonticTreatments.map((treatment) => (
          <div key={treatment.id}>
            

            <EditPeriodonticTreatmentsForm 
                periodonticTreatmentsId={treatment.id}
                periodonticTreatmentsData={{
                    
                    diagnosticoPer: treatment.diagnosticoPer,
                    observacionPer: treatment.observacionPer,
                    movilidadInferior: treatment.movilidadInferior,
                    furcaInferior: treatment.furcaInferior,
                    sangradoInferior: treatment.sangradoInferior,
                    placaInferior: treatment.placaInferior,
                    mrgGingivalInferiorA: treatment.mrgGingivalInferiorA,
                    profundidadSondajeInferiorA: treatment.profundidadSondajeInferiorA,
                    nivelInsercionInferiorA: treatment.nivelInsercionInferiorA,
                    mrgGingivalInferiorB: treatment.mrgGingivalInferiorB,
                    profundidadSondajeInferiorB: treatment.profundidadSondajeInferiorB,
                    nivelInsercionInferiorB: treatment.nivelInsercionInferiorB,
                    movilidadSuperior: treatment.movilidadSuperior,
                    furcaSuperior: treatment.furcaSuperior,
                    sangradoSuperior: treatment.sangradoSuperior,
                    placaSuperior: treatment.placaSuperior,
                    mrgGingivalSuperiorA: treatment.mrgGingivalSuperiorA,
                    profundidadSondajeSuperiorA: treatment.profundidadSondajeSuperiorA,
                    nivelInsercionSuperiorA: treatment.nivelInsercionSuperiorA,
                    mrgGingivalSuperiorB: treatment.mrgGingivalSuperiorB,
                    profundidadSondajeSuperiorB: treatment.profundidadSondajeSuperiorB,
                    nivelInsercionSuperiorB: treatment.nivelInsercionSuperiorB
                }} 
                updatePeriodonticTreatments={handleUpdatePeriodonticTreatments}
            />    
             
          </div>
        ))}
        
        

        <CreatePeriodonticTreatmentsForm
        patientId={patientId}
        createPeriodonticTreatment={handleCreatePeriodonticTreatments}
        />
        
      </Container>
    </>
  );
};

export default PeriodonticTreatmentsDetails;
