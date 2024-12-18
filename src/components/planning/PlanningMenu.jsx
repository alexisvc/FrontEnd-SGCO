import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Grid,
  Paper
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  ReceiptLong as ReceiptLongIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon
} from '@mui/icons-material';

const PlanningMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      to: "/planificacion/lista",
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      text: "Pacientes/Planificaciones",
      description: "Ver planificaciones y presupuestos"
    },
    {
      to: "/presupuestos",
      icon: <ReceiptLongIcon sx={{ fontSize: 40 }} />,
      text: "Presupuestos",
      description: "Ver y gestionar presupuestos"
    },
    {
      to: "/reportes-financieros",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
      text: "Reportes Financieros",
      description: "Ver reportes y estadísticas"
    }
  ];

  return (
    <div style={{ 
      backgroundColor: '#f5f1ef', 
      minHeight: '100vh', 
      padding: '20px'
    }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/main-menu")}
        sx={{ mb: 3 }}
      >
        Atrás
      </Button>

      <Container maxWidth="md">
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ mb: 4 }}
        >
          Planificación y Presupuesto
        </Typography>

        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <Link 
                  to={item.to}
                  style={{ 
                    textDecoration: "none", 
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      {item.icon}
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6">
                        {item.text}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PlanningMenu;