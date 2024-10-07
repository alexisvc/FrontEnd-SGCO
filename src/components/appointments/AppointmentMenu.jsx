import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Typography,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from '@mui/icons-material/Person';

const AppointmentMenu = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f5f1ef', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' , backgroundImage:"../../backgrounds/mainBack.png" }}>
    <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/main-menu")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Agendamiento de citas
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
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
                <PersonIcon style={{ fontSize: 40, marginRight: "40" }} />
              }
              style={{
                fontSize: "18px",
                padding: "20px",
                margin: "5%",
                width: "140%",
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
                <CalendarMonthIcon style={{ fontSize: 40, marginRight: "110" }} />
              }
              style={{
                fontSize: "18px",
                padding: "20px",
                margin: "5%",
                width: "145%",
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
      </div>
    </Container>
    </div>
  );
};

export default AppointmentMenu;
