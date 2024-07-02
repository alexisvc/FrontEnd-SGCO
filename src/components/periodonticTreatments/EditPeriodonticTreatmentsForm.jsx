import React, { useState } from "react";
import { 
    TextField, 
    Typography, 
    Grid, 
    Box, 
    Button, 
    Container, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Radio, 
    RadioGroup, 
    Checkbox,
    IconButton,
    FormGroup,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';

const EditPeriodonticTreatmentsForm = ({
    periodonticTreatmentsId,
    periodonticTreatmentsData,
    updatePeriodonticTreatments,
  
}) => {
  const [formData, setFormData] = useState({
    diagnosticoPer: periodonticTreatmentsData?.diagnosticoPer || "",
    observacionPer: periodonticTreatmentsData?.observacionPer || "",
    movilidadInferior: periodonticTreatmentsData?.movilidadInferior || false,
    furcaInferior: periodonticTreatmentsData?.furcaInferior || false,
    sangradoInferior: periodonticTreatmentsData?.sangradoInferior || false,
    placaInferior: periodonticTreatmentsData?.placaInferior || false,
    mrgGingivalInferiorA: periodonticTreatmentsData?.mrgGingivalInferiorA || false,
    profundidadSondajeInferiorA: periodonticTreatmentsData?.profundidadSondajeInferiorA || false,
    nivelInsercionInferiorA: periodonticTreatmentsData?.nivelInsercionInferiorA || false,
    mrgGingivalInferiorB: periodonticTreatmentsData?.mrgGingivalInferiorB || false,
    profundidadSondajeInferiorB: periodonticTreatmentsData?.profundidadSondajeInferiorB || false,
    nivelInsercionInferiorB: periodonticTreatmentsData?.nivelInsercionInferiorB || false,
    movilidadSuperior: periodonticTreatmentsData?.movilidadSuperior || false,
    furcaSuperior: periodonticTreatmentsData?.furcaSuperior || false,
    sangradoSuperior: periodonticTreatmentsData?.sangradoSuperior || false,
    placaSuperior: periodonticTreatmentsData?.placaSuperior || false,
    mrgGingivalSuperiorA: periodonticTreatmentsData?.mrgGingivalSuperiorA || false,
    profundidadSondajeSuperiorA: periodonticTreatmentsData?.profundidadSondajeSuperiorA || false,
    nivelInsercionSuperiorA: periodonticTreatmentsData?.nivelInsercionSuperiorA || false,
    mrgGingivalSuperiorB: periodonticTreatmentsData?.mrgGingivalSuperiorB || false,
    profundidadSondajeSuperiorB: periodonticTreatmentsData?.profundidadSondajeSuperiorB || false,
    nivelInsercionSuperiorB: periodonticTreatmentsData?.nivelInsercionSuperiorB || false,
  });

  const handleInputChangee = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e, listName) => {
    const { name, checked } = e.target;
    const updatedList = checked
      ? [...formData[listName], name]
      : formData[listName].filter(item => item !== name);

    setFormData({
      ...formData,
      [listName]: updatedList,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePeriodonticTreatments(periodonticTreatmentsId, formData);
  };

 

  return (
    <Container>
        <Typography  variant="h5" align="center" gutterBottom>Editar Historia de Periodoncia</Typography>
        <Grid container spacing={3}>
            <Grid item>
                <TextField
                    fullWidth
                    label="Diagnóstico"
                    name="diagnosticoPer"
                    value={formData.diagnosticoPer}
                    onChange={handleInputChangee}
                    
                />
            </Grid>
        </Grid>
      
    </Container>
  );
};

export default EditPeriodonticTreatmentsForm;
