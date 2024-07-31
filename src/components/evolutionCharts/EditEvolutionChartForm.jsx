import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const EditEvolutionChartForm = ({ evolutionChart, updateEvolutionChart }) => {
  const [formData, setFormData] = useState({
    fechaCuadEvol: evolutionChart?.fechaCuadEvol.split("T")[0] || "",
    actividadCuadEvol: evolutionChart?.actividadCuadEvol || "",
    recomendacionCuadEvol: evolutionChart?.recomendacionCuadEvol || "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (evolutionChart) {
      setFormData({
        fechaCuadEvol: evolutionChart.fechaCuadEvol.split("T")[0] || "",
        actividadCuadEvol: evolutionChart.actividadCuadEvol || "",
        recomendacionCuadEvol: evolutionChart.recomendacionCuadEvol || "",
      });
    }
  }, [evolutionChart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "archivo1") {
      setArchivo1(e.target.files[0]);
    } else if (e.target.name === "archivo2") {
      setArchivo2(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEvolutionChart(
        evolutionChart._id,
        formData,
        archivo1,
        archivo2
      );
      // Notificación de éxito
      toast.success("Cuadro de evolución actualizado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/patients");
    } catch (error) {
      // Notificación de error
      toast.error("Error al actualizar el Cuadro de evolución.", {
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
        <TextField
          name="actividadCuadEvol"
          value={formData.actividadCuadEvol}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="recomendacionCuadEvol"
          value={formData.recomendacionCuadEvol}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" mr={2}>
          <label htmlFor="archivo1-input">
            <input
              id="archivo1-input"
              name="archivo1"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              sx={{
                color: "white",
                backgroundColor: "#8ba082",
                //margin: 2,
                "&:hover": {
                  backgroundColor: "#5d6c56",
                },
              }}
              variant="contained"
              component="span"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              RX
            </Button>
          </label>
          {evolutionChart?.archivo1Url && (
            <Button
              sx={{
                color: "white",
                backgroundColor: "#5d6c56",
                ml: 2,
                "&:hover": {
                  backgroundColor: "#8ba082",
                },
              }}
              //variant="outlined"
              //color="secondary"
              onClick={() => window.open(evolutionChart.archivo1Url, "_blank")}
              startIcon={<DownloadIcon />}
            >
              RX
            </Button>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          <label htmlFor="archivo2-input">
            <input
              id="archivo2-input"
              name="archivo2"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              sx={{
                color: "white",
                backgroundColor: "#8ba082",
                //margin: 2,
                "&:hover": {
                  backgroundColor: "#5d6c56",
                },
              }}
              variant="contained"
              component="span"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              CS
            </Button>
          </label>
          {evolutionChart?.archivo2Url && (
            <Button
              sx={{
                color: "white",
                backgroundColor: "#5d6c56",
                ml: 2,
                "&:hover": {
                  backgroundColor: "#8ba082",
                },
              }}
              //variant="outlined"
              //color="secondary"
              onClick={() => window.open(evolutionChart.archivo2Url, "_blank")}
              startIcon={<DownloadIcon />}
            >
              CS
            </Button>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={handleSubmit}>
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditEvolutionChartForm;
