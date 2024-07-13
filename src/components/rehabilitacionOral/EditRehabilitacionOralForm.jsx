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
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router";

const EditRehabilitacionOralForm = ({
  rehabilitacionOral,
  updateRehabilitacionOral,
}) => {
  const [formData, setFormData] = useState({
    refHorizontal: rehabilitacionOral?.refHorizontal || false,
    refVertical: rehabilitacionOral?.refVertical || false,
    longitudLabio: rehabilitacionOral?.longitudLabio || false,
    formaLabio: rehabilitacionOral?.formaLabio || false,
    exposicionSonrisa: rehabilitacionOral?.exposicionSonrisa || false,
    corredorBucal: rehabilitacionOral?.corredorBucal || false,
    orientacionPlanoOclusalAnt:
      rehabilitacionOral?.orientacionPlanoOclusalAnt || false,
    visibilidadBordeSup: rehabilitacionOral?.visibilidadBordeSup || "",
    orientacionPlanoOclusalPost:
      rehabilitacionOral?.orientacionPlanoOclusalPost || false,
    anchoIncisivoCentalSup: rehabilitacionOral?.anchoIncisivoCentalSup || "",
    longitud: rehabilitacionOral?.longitud || "",
    colorDientes: rehabilitacionOral?.colorDientes || "",
    simetriaGingival: rehabilitacionOral?.simetriaGingival || false,
    biotipoPeriodental: rehabilitacionOral?.biotipoPeriodental || false,
    numeroDiente: rehabilitacionOral?.numeroDiente || false,
    perdidaHuesoPeriodental:
      rehabilitacionOral?.perdidaHuesoPeriodental || false,
    otrasPatologiasOseas: rehabilitacionOral?.otrasPatologiasOseas || "",
    restriccionViasRespiratorias: rehabilitacionOral?.restriccionViasRespiratorias || "",
    relacionIncisal: rehabilitacionOral?.relacionIncisal || false,
    overbite: rehabilitacionOral?.overbite || false,
    overjet: rehabilitacionOral?.overjet || false,
    tinitus: rehabilitacionOral?.tinitus || false,
    puedeRepetirMordida: rehabilitacionOral?.puedeRepetirMordida || "",
    restauracionesDefectuosas:
      rehabilitacionOral?.restauracionesDefectuosas || false,
    lesionesCariosas: rehabilitacionOral?.lesionesCariosas || false,
    dientesFaltantes: rehabilitacionOral?.dientesFaltantes || false,
    coronaDental: rehabilitacionOral?.coronaDental || false,
    espigos: rehabilitacionOral?.espigos || false,
    implantes: rehabilitacionOral?.implantes || false,
    edentuloParcial: rehabilitacionOral?.edentuloParcial || false,
    clasificacionDeKenedy: rehabilitacionOral?.clasificacionDeKenedy || "",
    edentuloTotal: rehabilitacionOral?.edentuloTotal || "",
    diagnosticoOclusal: rehabilitacionOral?.diagnosticoOclusal || "",
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
    await updateRehabilitacionOral(rehabilitacionOral.id, formData);
    navigate("/patients");
  };

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Editar Rehabilitación Oral
      </Typography>
      <Grid container spacing={2} sx={{ margin: 2 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Examen Extra Oral
        </Typography>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Referencia horizontal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="pupilas"
                    checked={formData.refHorizontal.includes("pupilas")}
                    onChange={(e) => handleCheckboxChange(e, "refHorizontal")}
                  />
                }
                label="Caries"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="labios"
                    checked={formData.refHorizontal.includes("labios")}
                    onChange={(e) => handleCheckboxChange(e, "refHorizontal")}
                  />
                }
                label="Labios"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="otro"
                    checked={formData.refHorizontal.includes("otro")}
                    onChange={(e) => handleCheckboxChange(e, "refHorizontal")}
                  />
                }
                label="Otro"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Referencia vertical:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="línea media facial"
                    checked={formData.refVertical.includes(
                      "línea media facial"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "refVertical")}
                  />
                }
                label="Línea media facial"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="otros"
                    checked={formData.refVertical.includes("otros")}
                    onChange={(e) => handleCheckboxChange(e, "refVertical")}
                  />
                }
                label="Otros"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Typography variant="h6" align="center" gutterBottom>
          Análisis de sonrisa:
        </Typography>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Longitud del labio:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Corto"
                    checked={formData.longitudLabio.includes("Corto")}
                    onChange={(e) => handleCheckboxChange(e, "longitudLabio")}
                  />
                }
                label="Corto"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Largo"
                    checked={formData.longitudLabio.includes("Largo")}
                    onChange={(e) => handleCheckboxChange(e, "longitudLabio")}
                  />
                }
                label="Largo"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Promedio"
                    checked={formData.longitudLabio.includes("Promedio")}
                    onChange={(e) => handleCheckboxChange(e, "longitudLabio")}
                  />
                }
                label="Promedio"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Forma del labio:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Delgado"
                    checked={formData.formaLabio.includes("Delgado")}
                    onChange={(e) => handleCheckboxChange(e, "formaLabio")}
                  />
                }
                label="Delgado"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="Grueso"
                    checked={formData.formaLabio.includes("Grueso")}
                    onChange={(e) => handleCheckboxChange(e, "formaLabio")}
                  />
                }
                label="Grueso"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Exposición de la sonrisa:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Bajo"
                    checked={formData.exposicionSonrisa.includes("Bajo")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Bajo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Media"
                    checked={formData.exposicionSonrisa.includes("Media")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Media"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Alta"
                    checked={formData.exposicionSonrisa.includes("Alta")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Alta"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Labio hipermovil"
                    checked={formData.exposicionSonrisa.includes(
                      "Labio hipermovil"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "exposicionSonrisa")
                    }
                  />
                }
                label="Labio hipermovil"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Corredor bucal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Presente"
                    checked={formData.corredorBucal.includes("Presente")}
                    onChange={(e) => handleCheckboxChange(e, "corredorBucal")}
                  />
                }
                label="Presente"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No presente"
                    checked={formData.corredorBucal.includes("No presente")}
                    onChange={(e) => handleCheckboxChange(e, "corredorBucal")}
                  />
                }
                label="No presente"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Orientación del plano oclusal anterior:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Ideal"
                    checked={formData.orientacionPlanoOclusalAnt.includes(
                      "Ideal"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalAnt")
                    }
                  />
                }
                label="Ideal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Canteado"
                    checked={formData.orientacionPlanoOclusalAnt.includes(
                      "Canteado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalAnt")
                    }
                  />
                }
                label="Canteado"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Typography variant="h6" align="center" gutterBottom>
          Análisis dentolabial:
        </Typography>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Visibilidad Borde Superior"
            name="visibilidadBordeSup"
            value={formData.visibilidadBordeSup}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Orientación del plano oclusal anterior:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Aceptable"
                    checked={formData.orientacionPlanoOclusalAnt.includes(
                      "Aceptable"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalAnt")
                    }
                  />
                }
                label="Aceptable"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Extrucción dental"
                    checked={formData.orientacionPlanoOclusalAnt.includes(
                      "Extrucción dental"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "orientacionPlanoOclusalAnt")
                    }
                  />
                }
                label="Extrucción dental"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={5} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Ancho del incisivo central superior:"
            name="anchoIncisivoCentalSup"
            value={formData.anchoIncisivoCentalSup}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={5} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Longitud:"
            name="longitud"
            value={formData.longitud}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Color de dientes:"
            name="colorDientes"
            value={formData.colorDientes}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Typography variant="h6" align="center" gutterBottom>
          Análisis Gingival
        </Typography>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Simetría de los cenit gingival:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Simétrico"
                    checked={formData.simetriaGingival.includes("Simétrico")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "simetriaGingival")
                    }
                  />
                }
                label="Simétrico"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Asimétrico"
                    checked={formData.simetriaGingival.includes("Asimétrico")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "simetriaGingival")
                    }
                  />
                }
                label="Asimétrico"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Biotipo peridontal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Delgado"
                    checked={formData.biotipoPeriodental.includes("Delgado")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "biotipoPeriodental")
                    }
                  />
                }
                label="Delgado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Normal"
                    checked={formData.biotipoPeriodental.includes("Normal")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "biotipoPeriodental")
                    }
                  />
                }
                label="Normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Grueso"
                    checked={formData.biotipoPeriodental.includes("Grueso")}
                    onChange={(e) =>
                      handleCheckboxChange(e, "biotipoPeriodental")
                    }
                  />
                }
                label="Grueso"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Typography variant="h6" align="center" gutterBottom>
          Análisis Radiográficos
        </Typography>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Número de Diente:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Caries"
                    checked={formData.numeroDiente.includes("Caries")}
                    onChange={(e) => handleCheckboxChange(e, "numeroDiente")}
                  />
                }
                label="Caries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Lesión Periapical"
                    checked={formData.numeroDiente.includes(
                      "Lesión Periapical"
                    )}
                    onChange={(e) => handleCheckboxChange(e, "numeroDiente")}
                  />
                }
                label="Lesión Periapical"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Perdida de hueso periodontal:
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Localizado"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Localizado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Localizado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Generalizado"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Generalizado"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Generalizado"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Volumen óseo regeneración"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Volumen óseo regeneración"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Volumen óseo regeneración"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Óptimo"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Óptimo"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Óptimo"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Seno neumatizado izquierdo"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Seno neumatizado izquierdo"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Seno neumatizado izquierdo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Seno neumatizado derecho"
                    checked={formData.perdidaHuesoPeriodental.includes(
                      "Seno neumatizado derecho"
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "perdidaHuesoPeriodental")
                    }
                  />
                }
                label="Seno neumatizado derecho"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Otras patologías óseas"
            name="otrasPatologiasOseas"
            value={formData.otrasPatologiasOseas}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Restricción de las vías respiratorias"
            name="restriccionViasRespiratorias"
            value={formData.restriccionViasRespiratorias}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Typography variant="h6" align="center" gutterBottom>
        Análisis Oclusión
        </Typography>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Relación Incisal:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 1"
                    checked={formData.relacionIncisal.includes("Clase 1")}
                    onChange={(e) => handleCheckboxChange(e, "relacionIncisal")}
                  />
                }
                label="Clase 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 2"
                    checked={formData.relacionIncisal.includes("Clase 2")}
                    onChange={(e) => handleCheckboxChange(e, "relacionIncisal")}
                  />
                }
                label="Clase 2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Clase 3"
                    checked={formData.relacionIncisal.includes("Clase 3")}
                    onChange={(e) => handleCheckboxChange(e, "relacionIncisal")}
                  />
                }
                label="Clase 3"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Overbite:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Menor a 2 mm"
                    checked={formData.overbite.includes("Menor a 2 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overbite")}
                  />
                }
                label="Menor a 2 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="2-4 mm"
                    checked={formData.overbite.includes("2-4 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overbite")}
                  />
                }
                label="2-4 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Mayor a 4 mm"
                    checked={formData.overbite.includes("Mayor a 4 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overbite")}
                  />
                }
                label="Mayor a 4 mm"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Overjet:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Menor a 0 mm"
                    checked={formData.overjet.includes("Menor a 0 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overjet")}
                  />
                }
                label="Menor a 0 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="0-3 mm"
                    checked={formData.overjet.includes("0-3 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overjet")}
                  />
                }
                label="0-3 mm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Mayor a 3 mm"
                    checked={formData.overjet.includes("Mayor a 3 mm")}
                    onChange={(e) => handleCheckboxChange(e, "overjet")}
                  />
                }
                label="Mayor a 3 mm"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tinitus:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.tinitus.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "tinitus")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.tinitus.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "tinitus")}
                  />
                }
                label="No"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Puede repetir mordida:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.puedeRepetirMordida.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "puedeRepetirMordida")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.puedeRepetirMordida.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "puedeRepetirMordida")}
                  />
                }
                label="No"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Typography variant="h6" align="center" gutterBottom>
        Condición Dental
        </Typography>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Restauraciones defectuosas:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.restauracionesDefectuosas.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "restauracionesDefectuosas")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.restauracionesDefectuosas.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "restauracionesDefectuosas")}
                  />
                }
                label="No"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Cuales"
                    checked={formData.restauracionesDefectuosas.includes("Cuales")}
                    onChange={(e) => handleCheckboxChange(e, "restauracionesDefectuosas")}
                  />
                }
                label="Cuales"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Lesiones cariosas:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.lesionesCariosas.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "lesionesCariosas")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.lesionesCariosas.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "lesionesCariosas")}
                  />
                }
                label="No"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Cuales"
                    checked={formData.lesionesCariosas.includes("Cuales")}
                    onChange={(e) => handleCheckboxChange(e, "lesionesCariosas")}
                  />
                }
                label="Cuales"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Dientes faltantes:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.dientesFaltantes.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "dientesFaltantes")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.dientesFaltantes.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "dientesFaltantes")}
                  />
                }
                label="No"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Cuales"
                    checked={formData.dientesFaltantes.includes("Cuales")}
                    onChange={(e) => handleCheckboxChange(e, "dientesFaltantes")}
                  />
                }
                label="Cuales"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Colocación de corona dental:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.coronaDental.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "coronaDental")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.coronaDental.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "coronaDental")}
                  />
                }
                label="No"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Cuales"
                    checked={formData.coronaDental.includes("Cuales")}
                    onChange={(e) => handleCheckboxChange(e, "coronaDental")}
                  />
                }
                label="Cuales"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Colocación de espigos:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.espigos.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "espigos")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.espigos.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "espigos")}
                  />
                }
                label="No"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Cuales"
                    checked={formData.espigos.includes("Cuales")}
                    onChange={(e) => handleCheckboxChange(e, "espigos")}
                  />
                }
                label="Cuales"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Erosión"
                    checked={formData.espigos.includes("Erosión")}
                    onChange={(e) => handleCheckboxChange(e, "espigos")}
                  />
                }
                label="Erosión"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Abfracción"
                    checked={formData.espigos.includes("Abfracción")}
                    onChange={(e) => handleCheckboxChange(e, "espigos")}
                  />
                }
                label="Abfracción"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Atrición"
                    checked={formData.espigos.includes("Atrición")}
                    onChange={(e) => handleCheckboxChange(e, "espigos")}
                  />
                }
                label="Atrición"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Colocación sobre implantes dientes:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Si"
                    checked={formData.implantes.includes("Si")}
                    onChange={(e) => handleCheckboxChange(e, "implantes")}
                  />
                }
                label="Si"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="No"
                    checked={formData.implantes.includes("No")}
                    onChange={(e) => handleCheckboxChange(e, "implantes")}
                  />
                }
                label="No"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Cuales"
                    checked={formData.implantes.includes("Cuales")}
                    onChange={(e) => handleCheckboxChange(e, "implantes")}
                  />
                }
                label="Cuales"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Edentulo parcial:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Superior"
                    checked={formData.edentuloParcial.includes("Superior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloParcial")}
                  />
                }
                label="Superior"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Inferior"
                    checked={formData.edentuloParcial.includes("Inferior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloParcial")}
                  />
                }
                label="Inferior"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Clasificación de Kenedy"
            name="clasificacionDeKenedy"
            value={formData.clasificacionDeKenedy}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Edéntulo total:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="Superior"
                    checked={formData.edentuloTotal.includes("Superior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloTotal")}
                  />
                }
                label="Superior"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Inferior"
                    checked={formData.edentuloTotal.includes("Inferior")}
                    onChange={(e) => handleCheckboxChange(e, "edentuloTotal")}
                  />
                }
                label="Inferior"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ marginRight: 0 }}>
          <TextField
            fullWidth
            label="Diagnóstico oclusal"
            name="diagnosticoOclusal"
            value={formData.diagnosticoOclusal}
            onChange={handleInputChange}
            variant="outlined"
          />
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

export default EditRehabilitacionOralForm;
