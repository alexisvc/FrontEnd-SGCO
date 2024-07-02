import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
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


const CreatePeriodonticTreatmentsForm = ({
  patientId,
  createPeriodonticTreatment,
}) => {
  const [formData, setFormData] = useState({
    diagnosticoPer:  "",
    observacionPer:  "",
    movilidadInferior: [],
    furcaInferior: [],
    sangradoInferior: [],
    placaInferior: [],
    mrgGingivalInferiorA: [],
    profundidadSondajeInferiorA: [],
    nivelInsercionInferiorA: [],
    mrgGingivalInferiorB: [],
    profundidadSondajeInferiorB: [],
    nivelInsercionInferiorB: [],
    movilidadSuperior: [],
    furcaSuperior: [],
    sangradoSuperior: [],
    placaSuperior: [],
    mrgGingivalSuperiorA: [],
    profundidadSondajeSuperiorA: [],
    nivelInsercionSuperiorA: [],
    mrgGingivalSuperiorB: [],
    profundidadSondajeSuperiorB: [],
    nivelInsercionSuperiorB: []
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
    const newPeriodonticTreatmentData = {
      ...formData,
      paciente: patientId,
    };
    
    await createPeriodonticTreatment(newPeriodonticTreatmentData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
        diagnosticoPer:  "",
        observacionPer:  "",
        movilidadInferior: [],
        furcaInferior: [],
        sangradoInferior: [],
        placaInferior: [],
        mrgGingivalInferiorA: [],
        profundidadSondajeInferiorA: [],
        nivelInsercionInferiorA: [],
        mrgGingivalInferiorB: [],
        profundidadSondajeInferiorB: [],
        nivelInsercionInferiorB: [],
        movilidadSuperior: [],
        furcaSuperior: [],
        sangradoSuperior: [],
        placaSuperior: [],
        mrgGingivalSuperiorA: [],
        profundidadSondajeSuperiorA: [],
        nivelInsercionSuperiorA: [],
        mrgGingivalSuperiorB: [],
        profundidadSondajeSuperiorB: [],
        nivelInsercionSuperiorB: []
    });
    
  };

  return (
    <Container>
        <Typography  variant="h5" align="center" gutterBottom>Crear Historia de Periodoncia</Typography>
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

export default CreatePeriodonticTreatmentsForm;
