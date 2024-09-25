import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useAppointments } from "../../hooks/useAppointment";
import { usePatients } from "../../hooks/usePatients"; // Hook para buscar pacientes
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import dayjs from "dayjs"; // Para obtener la fecha de hoy
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const AppointmentMenu = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/main-menu")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        Agendamiento de citas
      </Typography>
      <div>
        <Link
          to="/odontologos"
          className="link-button"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <CalendarMonthIcon style={{ fontSize: 40, marginRight: "90" }} />
            }
            style={{
              fontSize: "18px",
              padding: "20px",
              margin: "5%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
            sx={{
              color: "white",
              backgroundColor: "#8ba082",
              "&:hover": {
                backgroundColor: "#5d6c56",
              },
            }}
          >
            Gestión de Odontólogos
          </Button>
        </Link>
      </div>
      <div>
        <Link
          to="/agendamiento/detalles"
          className="link-button"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <CalendarMonthIcon style={{ fontSize: 40, marginRight: "90" }} />
            }
            style={{
              fontSize: "18px",
              padding: "20px",
              margin: "5%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
            sx={{
              color: "white",
              backgroundColor: "#8ba082",
              "&:hover": {
                backgroundColor: "#5d6c56",
              },
            }}
          >
            Agenda de Citas
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default AppointmentMenu;
