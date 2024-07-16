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
  Paper
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router";

const EditDisfuncionMandibularForm = ({
  disfuncionMandibular,
  updateDisfuncionMandibular,
}) => {
  const [formData, setFormData] = useState({
    huesoCortical: disfuncionMandibular?.huesoCortical || false,
    espacioArticular: disfuncionMandibular?.espacioArticular || false,
    condillo: disfuncionMandibular?.condillo || false,
    desviacionLineaMedia: disfuncionMandibular?.desviacionLineaMedia || false,
    conReduccion: disfuncionMandibular?.conReduccion || false,
    sinReduccion: disfuncionMandibular?.sinReduccion || false,
    clickArticular: disfuncionMandibular?.clickArticular || false,
    crepitacion: disfuncionMandibular?.crepitacion || false,
    subluxacion: disfuncionMandibular?.subluxacion || false,
    dolorArticularDer:
      disfuncionMandibular?.dolorArticularDer || Array(3).fill(""),
    dolorArticularIzq:
      disfuncionMandibular?.dolorArticularIzq || Array(3).fill(""),
    dolorMuscularIzq: disfuncionMandibular?.dolorMuscularIzq || Array(27).fill(""),
    dolorMuscularDer: disfuncionMandibular?.dolorMuscularDer || Array(27).fill(""),
    dolorMuscular: disfuncionMandibular?.dolorMuscular || false,
    dolorMuscularDescripcion:
      disfuncionMandibular?.dolorMuscularDescripcion || "",
    dolorOrofacialComunMuscular:
      disfuncionMandibular?.dolorOrofacialComunMuscular || false,
    mallampati: disfuncionMandibular?.mallampati || false,
    dolorOrofacialComunApnea:
      disfuncionMandibular?.dolorOrofacialComunApnea || false,
  });

  const navigate = useNavigate();

  const handleArrayInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [name]: updatedArray,
    });
  };

  const handleCheckboxChange = (e, listName) => {
    const { name, checked } = e.target;
    const updatedList = checked
      ? [...formData[listName], name]
      : formData[listName].filter((item) => item !== name);

    setFormData({
      ...formData,
      [listName]: updatedList,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDisfuncionMandibular(disfuncionMandibular.id, formData);
    navigate("/patients");
  };

  return (
    <Container component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        Disfunción Temporo Mandibular
      </Typography>
      <Grid container spacing={2} sx={{ margin: 2 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Análisis de ATM
        </Typography>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Erosión de hueso cortical</FormLabel>
            <RadioGroup
              row
              aria-label="huesoCortical"
              name="huesoCortical"
              value={formData.huesoCortical}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Estrechamiento del espacio articular
            </FormLabel>
            <RadioGroup
              row
              aria-label="espacioArticular"
              name="espacioArticular"
              value={formData.espacioArticular}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Espacio anormal del cóndilo
            </FormLabel>
            <RadioGroup
              row
              aria-label="condillo"
              name="condillo"
              value={formData.condillo}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Desviación de la línea media
            </FormLabel>
            <RadioGroup
              row
              aria-label="desviacionLineaMedia"
              name="desviacionLineaMedia"
              value={formData.desviacionLineaMedia}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Typography variant="h6" align="center" gutterBottom>
          Desplazamiento discal
        </Typography>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Con reducción</FormLabel>
            <RadioGroup
              row
              aria-label="conReduccion"
              name="conReduccion"
              value={formData.conReduccion}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sin reducción</FormLabel>
            <RadioGroup
              row
              aria-label="sinReduccion"
              name="sinReduccion"
              value={formData.sinReduccion}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Click Articular</FormLabel>
            <RadioGroup
              row
              aria-label="clickArticular"
              name="clickArticular"
              value={formData.clickArticular}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Crepitación</FormLabel>
            <RadioGroup
              row
              aria-label="crepitacion"
              name="crepitacion"
              value={formData.crepitacion}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Subluxación</FormLabel>
            <RadioGroup
              row
              aria-label="subluxacion"
              name="subluxacion"
              value={formData.subluxacion}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Izquierda"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Derecha"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Dolor Articular
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img
            src="/public/resources/images/dolorArticular.png"
            alt="dolor articular"
            style={{ width: "40%" }}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h7" gutterBottom>
            Izquierda
          </Typography>
        </Grid>
        {formData.dolorArticularIzq.map((value, index) => (
          <Grid item xs={2} key={index}>
            <TextField
              name="dolorArticularIzq"
              label={index + 1}
              value={value}
              onChange={(e) => handleArrayInputChange(e, index)}
              variant="outlined"
              size="small"
            />
          </Grid>
        ))}

        <Grid item xs={4}>
          <Typography variant="h7" gutterBottom>
            Derecha
          </Typography>
        </Grid>
        {formData.dolorArticularDer.map((value, index) => (
          <Grid item xs={2} key={index}>
            <TextField
              name="dolorArticularDer"
              label={index + 1}
              value={value}
              onChange={(e) => handleArrayInputChange(e, index)}
              variant="outlined"
              size="small"
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h6" align="left" gutterBottom>
            Dolor Muscular
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img
            src="/public/resources/images/dolorMuscularIzq.png"
            alt="dolor muscular izquierda"
            style={{ width: "90%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <img
            src="/public/resources/images/dolorMuscularDer.png"
            alt="dolor muscular derecha"
            style={{ width: "90%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" align="left" gutterBottom>
            Izquierda
          </Typography>
        </Grid>
        <Grid container spacing={2} item xs={6} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {formData.dolorMuscularIzq.map((value, index) => (
            <Grid item xs={2} key={index}>
              <TextField
                name="dolorMuscularIzq"
                label={index + 1}
                value={value}
                onChange={(e) => handleArrayInputChange(e, index)}
                variant="outlined"
                size="small"
              />
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" align="left" gutterBottom>
            Derecha
          </Typography>
        </Grid>

        <Grid container spacing={2} item xs={6} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {formData.dolorMuscularDer.map((value, index) => (
            <Grid item xs={2} key={index}>
              <TextField
                name="dolorMuscularDer"
                label={index + 1}
                value={value}
                onChange={(e) => handleArrayInputChange(e, index)}
                variant="outlined"
                size="small"
              />
            </Grid>
          ))}
        </Grid>
        
        
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Mialguia local (aguda)"
                    checked={formData.dolorMuscular.includes(
                      "Mialguia local (aguda)"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Mialguia local (aguda)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Dolor miofacial con derivación"
                    checked={formData.dolorMuscular.includes(
                      "Dolor miofacial con derivación"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Dolor miofacial con derivación"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Espasmo muscular"
                    checked={formData.dolorMuscular.includes(
                      "Espasmo muscular"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Espasmo muscular"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Artralgia"
                    checked={formData.dolorMuscular.includes("Artralgia")}
                    onChange={(e) => handleCheckboxChange(e, "dolorMuscular")}
                  />
                }
                label="Artralgia"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Descripción"
            name="dolorMuscularDescripcion"
            value={formData.dolorMuscularDescripcion}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Dolor Orofacial Común</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Dolor Tensional"
                    checked={formData.dolorOrofacialComunMuscular.includes(
                      "Dolor Tensional"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                    }
                  />
                }
                label="Dolor Tensional"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Dolor Neuropático"
                    checked={formData.dolorOrofacialComunMuscular.includes(
                      "Dolor Neuropático"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                    }
                  />
                }
                label="Dolor Neuropático"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Migraña"
                    checked={formData.dolorOrofacialComunMuscular.includes(
                      "Migraña"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                    }
                  />
                }
                label="Migraña"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Dolor psicógeno"
                    checked={formData.dolorOrofacialComunMuscular.includes(
                      "Dolor psicógeno"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunMuscular")
                    }
                  />
                }
                label="Dolor psicógeno"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" align="left" gutterBottom>
            Apnea Obstructiva del Sueño
          </Typography>
          <Typography variant="h7" align="left" gutterBottom>
            Clasificación Mallampati
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <img
            src="/public/resources/images/mallampati.png"
            alt="dolor articular"
            style={{ width: "40%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 1"
                    checked={formData.mallampati.includes("Clase 1")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 2"
                    checked={formData.mallampati.includes("Clase 2")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 3"
                    checked={formData.mallampati.includes("Clase 3")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 3"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 4"
                    checked={formData.mallampati.includes("Clase 4")}
                    onChange={(e) => handleCheckboxChange(e, "mallampati")}
                  />
                }
                label="Clase 4"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Dolor Orofacial Común</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Arco Estrecho"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Arco Estrecho"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Arco Estrecho"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Bóveda palatina estrecha"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Bóveda palatina estrecha"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Bóveda palatina estrecha"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Festoneado de la lengua"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Festoneado de la lengua"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Festoneado de la lengua"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Amígdalas agrandadas"
                    checked={formData.dolorOrofacialComunApnea.includes(
                      "Amígdalas agrandadas"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorOrofacialComunApnea")
                    }
                  />
                }
                label="Amígdalas agrandadas"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <SaveIcon fontSize="large" />
              Guardar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditDisfuncionMandibularForm;
