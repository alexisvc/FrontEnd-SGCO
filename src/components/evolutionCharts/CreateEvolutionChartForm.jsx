import React, { useState, useRef } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Box,
  TextareaAutosize,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateEvolutionChartForm = ({ patientId, createEvolutionChart }) => {
  const [formData, setFormData] = useState({
    fechaCuadEvol: "",
    actividadCuadEvol: "",
    recomendacionCuadEvol: "",
  });

  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  const sigCanvas1 = useRef(null);
  const sigCanvas2 = useRef(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveSignature1 = () => {
    if (sigCanvas1.current) {
      const dataURL = sigCanvas1.current.getTrimmedCanvas().toDataURL("image/png");
      const file = dataURLtoFile(dataURL, `firma1_${Date.now()}.png`);
      console.log('Saved Signature 1:', file);
      setArchivo1(file);
    }
  };

  const saveSignature2 = () => {
    if (sigCanvas2.current) {
      const dataURL = sigCanvas2.current.getTrimmedCanvas().toDataURL("image/png");
      const file = dataURLtoFile(dataURL, `firma2_${Date.now()}.png`);
      console.log('Saved Signature 2:', file);
      setArchivo2(file);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const clearSignature1 = () => {
    if (sigCanvas1.current) {
      sigCanvas1.current.clear();
      setArchivo1(null);
    }
  };

  const clearSignature2 = () => {
    if (sigCanvas2.current) {
      sigCanvas2.current.clear();
      setArchivo2(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guardar las firmas
    saveSignature1();
    saveSignature2();

    // Esperar para asegurarse de que las firmas se hayan guardado
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!archivo1 || !archivo2) {
      toast.error("Por favor, asegúrate de que ambas firmas estén completadas.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const newEvolutionChartData = {
        ...formData,
        paciente: patientId,
      };

      console.log("Archivo 1:", archivo1);
      console.log("Archivo 2:", archivo2);

      await createEvolutionChart(newEvolutionChartData, archivo1, archivo2);

      // Resetear los estados del formulario y las firmas
      setFormData({
        fechaCuadEvol: "",
        actividadCuadEvol: "",
        recomendacionCuadEvol: "",
      });
      clearSignature1();
      clearSignature2();

      toast.success("Cuadro de evolución creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
    } catch (error) {
      toast.error("Error al crear el Cuadro de evolución.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          name="fechaCuadEvol"
          value={formData.fechaCuadEvol}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          type="date"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="actividadCuadEvol"
          value={formData.actividadCuadEvol}
          onChange={handleInputChange}
          minRows={3}
          style={{
            width: "100%",
            padding: "4px",
            fontSize: "14px",
            fontFamily: "Roboto",
            borderRadius: "4px",
          }}
          size="large"
        />
      </TableCell>
      <TableCell>
        <TextareaAutosize
          name="recomendacionCuadEvol"
          value={formData.recomendacionCuadEvol}
          onChange={handleInputChange}
          minRows={3}
          style={{
            width: "100%",
            padding: "4px",
            fontSize: "14px",
            fontFamily: "Roboto",
            borderRadius: "4px",
          }}
          size="large"
        />
      </TableCell>
      <TableCell>
        <Box>
          <SignatureCanvas
            ref={sigCanvas1}
            penColor="black"
            canvasProps={{
              width: 200,
              height: 100,
              style: { border: "2px solid #000", borderRadius: "4px" },
            }}
            onEnd={saveSignature1}
          />
          <Box display="flex" justifyContent="center" mt={1}>
            <IconButton onClick={clearSignature1}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <SignatureCanvas
            ref={sigCanvas2}
            penColor="black"
            canvasProps={{
              width: 200,
              height: 100,
              style: { border: "2px solid #000", borderRadius: "4px" },
            }}
            onEnd={saveSignature2}
          />
          <Box display="flex" justifyContent="center" mt={1}>
            <IconButton onClick={clearSignature2}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={handleSubmit}>
          <AddCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CreateEvolutionChartForm;
