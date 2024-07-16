import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  Container,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router";

const EditPeriodonticTreatmentsForm = ({
  periodonticTreatment,
  updatePeriodonticTreatment,
}) => {
  const [formData, setFormData] = useState({
    diagnosticoPer: periodonticTreatment?.diagnosticoPer || "",
    observacionPer: periodonticTreatment?.observacionPer || "",
    movilidadInferior:
      periodonticTreatment?.movilidadInferior || Array(16).fill(""), // 16 empty slots for each tooth
    furcaInferior: periodonticTreatment?.furcaInferior || Array(16).fill(""),
    sangradoInferior: periodonticTreatment?.sangradoInferior || false,
    placaInferior: periodonticTreatment?.placaInferior || false,
    mrgGingivalInferiorA:
      periodonticTreatment?.mrgGingivalInferiorA || Array(16).fill(""),
    profundidadSondajeInferiorA:
      periodonticTreatment?.profundidadSondajeInferiorA || Array(16).fill(""),
    nivelInsercionInferiorA:
      periodonticTreatment?.nivelInsercionInferiorA || Array(16).fill(""),
    mrgGingivalInferiorB:
      periodonticTreatment?.mrgGingivalInferiorB || Array(16).fill(""),
    profundidadSondajeInferiorB:
      periodonticTreatment?.profundidadSondajeInferiorB || Array(16).fill(""),
    nivelInsercionInferiorB:
      periodonticTreatment?.nivelInsercionInferiorB || Array(16).fill(""),
    movilidadSuperior:
      periodonticTreatment?.movilidadSuperior || Array(16).fill(""),
    furcaSuperior: periodonticTreatment?.furcaSuperior || Array(16).fill(""),
    sangradoSuperior: periodonticTreatment?.sangradoSuperior || false,
    placaSuperior: periodonticTreatment?.placaSuperior || false,
    mrgGingivalSuperiorA:
      periodonticTreatment?.mrgGingivalSuperiorA || Array(16).fill(""),
    profundidadSondajeSuperiorA:
      periodonticTreatment?.profundidadSondajeSuperiorA || Array(16).fill(""),
    nivelInsercionSuperiorA:
      periodonticTreatment?.nivelInsercionSuperiorA || Array(16).fill(""),
    mrgGingivalSuperiorB:
      periodonticTreatment?.mrgGingivalSuperiorB || Array(16).fill(""),
    profundidadSondajeSuperiorB:
      periodonticTreatment?.profundidadSondajeSuperiorB || Array(16).fill(""),
    nivelInsercionSuperiorB:
      periodonticTreatment?.nivelInsercionSuperiorB || Array(16).fill(""),
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePeriodonticTreatment(periodonticTreatment.id, formData);
    navigate("/patients");
  };

  return (
    <Container component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        Editar Historia de Periodoncia
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diagnóstico"
            name="diagnosticoPer"
            value={formData.diagnosticoPer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observaciones"
            name="observacionPer"
            value={formData.observacionPer}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Inferior
          </Typography>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Movilidad</Typography>
                </TableCell>
                {formData.movilidadInferior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="movilidadInferior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Furca</Typography>
                </TableCell>
                {formData.furcaInferior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="furcaInferior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/*Sangrado / Supuración*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Sangrado / Supuración</Typography>
                </TableCell>
                {formData.sangradoInferior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.sangradoInferior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="sangradoInferior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              {/*Placa*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Placa</Typography>
                </TableCell>
                {formData.placaInferior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.placaInferior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="placaInferior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalInferiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalInferiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeInferiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeInferiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionInferiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionInferiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/* Add more imgs here */}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalInferiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalInferiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeInferiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeInferiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionInferiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionInferiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom>
            Superior
          </Typography>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Movilidad</Typography>
                </TableCell>
                {formData.movilidadSuperior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="movilidadSuperior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Furca</Typography>
                </TableCell>
                {formData.furcaSuperior.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="furcaSuperior"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/*Sangrado / Supuración*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Sangrado / Supuración</Typography>
                </TableCell>
                {formData.sangradoSuperior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.sangradoSuperior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="sangradoSuperior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              {/*Placa*/}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Placa</Typography>
                </TableCell>
                {formData.placaSuperior.map(
                  (value, index) =>
                    // Asegúrate de que index esté dentro del rango adecuado antes de mostrar los TextField
                    index % 3 === 0 && (
                      <TableCell key={index}>
                        {/* Muestra hasta 3 textfields en la misma celda */}
                        {formData.placaSuperior
                          .slice(index, index + 3)
                          .map((item, idx) => (
                            <TextField
                              key={idx}
                              name="placaSuperior"
                              value={item}
                              onChange={(e) =>
                                handleArrayInputChange(e, index + idx)
                              }
                              variant="outlined"
                              size="small"
                              style={{ marginBottom: "8px" }} // Espacio entre TextField
                            />
                          ))}
                      </TableCell>
                    )
                )}
              </TableRow>

              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalSuperiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalSuperiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeSuperiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeSuperiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionSuperiorA.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionSuperiorA"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              {/* Add more imgs here */}
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Margen Gingival</Typography>
                </TableCell>
                {formData.mrgGingivalSuperiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="mrgGingivalSuperiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Profundidad de sondaje</Typography>
                </TableCell>
                {formData.profundidadSondajeSuperiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="profundidadSondajeSuperiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7">Nivel de inserción</Typography>
                </TableCell>
                {formData.nivelInsercionSuperiorB.map((value, index) => (
                  <TableCell key={index}>
                    <TextField
                      name="nivelInsercionSuperiorB"
                      value={value}
                      onChange={(e) => handleArrayInputChange(e, index)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h7"></Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.8</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">4.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.1</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.2</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.3</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.4</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.5</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.6</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.7</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h7">3.8</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

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

export default EditPeriodonticTreatmentsForm;
