import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
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
} from "@mui/material";
import { useNavigate } from "react-router";

const CreateDisfuncionMandibularForm = ({
  patientId,
  createDisfuncionMandibular,
}) => {
  const [formData, setFormData] = useState({
    huesoCortical: "",
    espacioArticular: "",
    condillo: "",
    desviacionLineaMedia: "",
    conReduccion: "",
    sinReduccion: "",
    clickArticular: "",
    crepitacion: "",
    subluxacion: "",
    dolorArticularDer: [],
    dolorArticularIzq: [],
    dolorMuscularIzq: [],
    dolorMuscularDer: [],
    dolorMuscular: [],
    dolorMuscularDescripcion: "",
    dolorOrofacialComunMuscular: [],
    mallampati: [],
    dolorOrofacialComunApnea: [],
  });

  const navigate = useNavigate();

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
    const newData = {
      ...formData,
      paciente: patientId,
    };

    await createDisfuncionMandibular(newData);
    // Lógica para limpiar el formulario o mostrar un mensaje de éxito
    setFormData({
      huesoCortical: "",
      espacioArticular: "",
      condillo: "",
      desviacionLineaMedia: "",
      conReduccion: "",
      sinReduccion: "",
      clickArticular: "",
      crepitacion: "",
      subluxacion: "",
      dolorArticularDer: [],
      dolorArticularIzq: [],
      dolorMuscularIzq: [],
      dolorMuscularDer: [],
      dolorMuscular: [],
      dolorMuscularDescripcion: "",
      dolorOrofacialComunMuscular: [],
      mallampati: [],
      dolorOrofacialComunApnea: [],
    });
    navigate("/patients");
  };

  return (
    <Container>
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

        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Izquierda:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="1"
                    checked={formData.dolorArticularIzq.includes("1")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorArticularIzq")
                    }
                  />
                }
                label="1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="2"
                    checked={formData.dolorArticularIzq.includes("2")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorArticularIzq")
                    }
                  />
                }
                label="2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="3"
                    checked={formData.dolorArticularIzq.includes("3")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorArticularIzq")
                    }
                  />
                }
                label="3"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Derecha:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="1"
                    checked={formData.dolorArticularDer.includes("1")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorArticularDer")
                    }
                  />
                }
                label="1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="2"
                    checked={formData.dolorArticularDer.includes("2")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorArticularDer")
                    }
                  />
                }
                label="2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="3"
                    checked={formData.dolorArticularDer.includes("3")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorArticularDer")
                    }
                  />
                }
                label="3"
              />
            </FormGroup>
          </FormControl>
        </Grid>
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

        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Izquierda:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="1"
                    checked={formData.dolorMuscularIzq.includes("1")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="2"
                    checked={formData.dolorMuscularIzq.includes("2")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="3"
                    checked={formData.dolorMuscularIzq.includes("3")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="3"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="4"
                    checked={formData.dolorMuscularIzq.includes("4")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="4"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="5"
                    checked={formData.dolorMuscularIzq.includes("5")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="5"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="6"
                    checked={formData.dolorMuscularIzq.includes("6")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="6"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="7"
                    checked={formData.dolorMuscularIzq.includes("7")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="7"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="8"
                    checked={formData.dolorMuscularIzq.includes("8")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="8"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="9"
                    checked={formData.dolorMuscularIzq.includes("9")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="9"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="10"
                    checked={formData.dolorMuscularIzq.includes("10")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="10"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="11"
                    checked={formData.dolorMuscularIzq.includes("11")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="11"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="12"
                    checked={formData.dolorMuscularIzq.includes("12")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="12"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="13"
                    checked={formData.dolorMuscularIzq.includes("13")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="13"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="14"
                    checked={formData.dolorMuscularIzq.includes("14")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="14"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="15"
                    checked={formData.dolorMuscularIzq.includes("15")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="15"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="16"
                    checked={formData.dolorMuscularIzq.includes("16")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="16"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="17"
                    checked={formData.dolorMuscularIzq.includes("17")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="17"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="18"
                    checked={formData.dolorMuscularIzq.includes("18")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="18"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="19"
                    checked={formData.dolorMuscularIzq.includes("19")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="19"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="20"
                    checked={formData.dolorMuscularIzq.includes("20")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="20"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="21"
                    checked={formData.dolorMuscularIzq.includes("21")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="21"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="22"
                    checked={formData.dolorMuscularIzq.includes("22")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="22"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="23"
                    checked={formData.dolorMuscularIzq.includes("23")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="23"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="24"
                    checked={formData.dolorMuscularIzq.includes("24")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="24"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="25"
                    checked={formData.dolorMuscularIzq.includes("25")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="25"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="26"
                    checked={formData.dolorMuscularIzq.includes("26")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="26"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="27"
                    checked={formData.dolorMuscularIzq.includes("27")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularIzq")
                    }
                  />
                }
                label="27"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Derecha:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="1"
                    checked={formData.dolorMuscularDer.includes("1")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="2"
                    checked={formData.dolorMuscularDer.includes("2")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="3"
                    checked={formData.dolorMuscularDer.includes("3")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="3"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="4"
                    checked={formData.dolorMuscularDer.includes("4")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="4"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="5"
                    checked={formData.dolorMuscularDer.includes("5")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="5"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="6"
                    checked={formData.dolorMuscularDer.includes("6")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="6"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="7"
                    checked={formData.dolorMuscularDer.includes("7")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="7"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="8"
                    checked={formData.dolorMuscularDer.includes("8")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="8"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="9"
                    checked={formData.dolorMuscularDer.includes("9")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="9"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="10"
                    checked={formData.dolorMuscularDer.includes("10")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="10"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="11"
                    checked={formData.dolorMuscularDer.includes("11")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="11"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="12"
                    checked={formData.dolorMuscularDer.includes("12")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="12"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="13"
                    checked={formData.dolorMuscularDer.includes("13")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="13"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="14"
                    checked={formData.dolorMuscularDer.includes("14")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="14"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="15"
                    checked={formData.dolorMuscularDer.includes("15")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="15"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="16"
                    checked={formData.dolorMuscularDer.includes("16")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="16"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="17"
                    checked={formData.dolorMuscularDer.includes("17")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="17"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="18"
                    checked={formData.dolorMuscularDer.includes("18")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="18"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="19"
                    checked={formData.dolorMuscularDer.includes("19")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="19"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="20"
                    checked={formData.dolorMuscularDer.includes("20")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="20"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="21"
                    checked={formData.dolorMuscularDer.includes("21")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="21"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="22"
                    checked={formData.dolorMuscularDer.includes("22")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="22"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="23"
                    checked={formData.dolorMuscularDer.includes("23")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="23"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="24"
                    checked={formData.dolorMuscularDer.includes("24")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="24"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="25"
                    checked={formData.dolorMuscularDer.includes("25")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="25"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="26"
                    checked={formData.dolorMuscularDer.includes("26")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="26"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="27"
                    checked={formData.dolorMuscularDer.includes("27")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "dolorMuscularDer")
                    }
                  />
                }
                label="27"
              />
            </FormGroup>
          </FormControl>
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

export default CreateDisfuncionMandibularForm;
