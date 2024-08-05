import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LoginIcon from "@mui/icons-material/Login";
import StartIcon from "@mui/icons-material/Start";
import LogoutIcon from "@mui/icons-material/Logout";
import PopUpExit from "./extras/PopUpExit";
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
  TextField,
  Container,
  Box,
} from "@mui/material";

function Home({ user, logout }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const isLoggedIn = !!user;

  return (
    <div className="welcome">
      {isPopUpOpen && (
        <PopUpExit
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          logout={logout}
        />
      )}
      {!isLoggedIn ? (
        <>
          {/* Componente de LOGIN */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
          <div>
          <div className="img-form">
            <img
              src="public\backgrounds\main.png"
              alt="MP"
            />
          </div>


            <Link to="/login">
              <Button      
                color="primary"
                startIcon={<LoginIcon />}
                size = "large"
                sx={{
                  color: 'white',
                  backgroundColor: "#8ba082",
                  marginBottom: 5,
                  '&:hover': {
                    backgroundColor: "#5d6c56", 
                  },
                }}
                style={{
                  fontSize: "20px", // Aumenta el tamaño del texto
                  padding: "15px 30px", // Aumenta el relleno para hacer el botón más grande
                  
                }}
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Componente de HOME */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "auto",
              marginRight: "0.5%",
            }}
          >
            <Button
              //variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => setIsPopUpOpen(true)}
              variant="contained"
              color="primary"
              size = "large"
              sx={{
                color: 'white',
                backgroundColor: "#8ba082",
                margin: 2,
                '&:hover': {
                  backgroundColor: "#5d6c56", 
                },
              }}
              style={{
                fontSize: '15px', // Aumenta el tamaño del texto
                padding: '7px 20px', // Aumenta el relleno para hacer el botón más grande
                marginLeft: 'auto', // Mueve el botón a la derecha
              }}
            >
              Salir
            </Button>
          </div>
          <div className="img-form">
           <img src="public\backgrounds\main.png" />
          </div>

          <div>
            <Link to="/main-menu" className="link-button">
              <Button
                //variant="outlined"
                variant="contained"
                color="primary"
                startIcon={<StartIcon />}
                size = "large"
                sx={{
                  color: 'white',
                  backgroundColor: "#8ba082",
                  margin: 5,
                  '&:hover': {
                    backgroundColor: "#5d6c56", 
                  },
                }}
                style={{
                  fontSize: "20px", // Aumenta el tamaño del texto
                  padding: "15px 30px", // Aumenta el relleno para hacer el botón más grande
                }}
              >
                Continuar
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
