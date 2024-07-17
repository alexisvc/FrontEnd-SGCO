import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
  FaArrowRight,
  FaGamepad,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import LoginIcon from '@mui/icons-material/Login';
import StartIcon from '@mui/icons-material/Start';
import LogoutIcon from '@mui/icons-material/Logout';
import { FiVolume2 } from "react-icons/fi";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
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

function Home({ user, logout, login }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { speak, speaking } = useSpeechSynthesis();

  const handleImageClick = () => {
    if (!speaking) {
      speak(
        "¡Hola! Bienvenido a PictoAndes, soy Andino, tu guía en esta aventura."
      );
    }
  };

  // Login de invitado
  const handleGuestLogin = async () => {
    await login({
      username: "invitado@correo.com",
      password: "Invitado123@",
    });
  };

  const isLoggedIn = !!user;

  return (
    <div 
    className="welcome"
    >
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
          <div
            //className="app-navigation"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {/* 
            <Link to="/about-us" className="link-button">
              <button>
                <FaInfoCircle />
                <span>Créditos </span>
              </button>
            </Link>
            */}
          </div>
          {/*<h2>Bienvenido a PictoAndes</h2>
            <img
              src="public/characters/andino.png"
              alt="imagen de la aventura"
            />*/}

          {/* 
          <img
            className="img-home"
            src="public\credits\home.png"
            alt="creditos"
          />
          */}
          <br />
          <br />
          <br />
          <div 
          //className="buttons-welcome"
          >
            <Link to="/login" 
            //className="link-button"
            >
              <Button
              variant="outlined"
              //variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              style={{
                fontSize: '20px', // Aumenta el tamaño del texto
                padding: '15px 30px', // Aumenta el relleno para hacer el botón más grande
              }}
              >   
                 Iniciar Sesión
              </Button>
            </Link>

            {/*<Link to="/" className="link-button">
              <button onClick={handleGuestLogin}>
                <FaGamepad />
                <span> Jugar como invitado</span>
              </button>
          </Link>*/}

            {/*<Link to="/register" className="link-button">
              <button>
                <FaUserPlus />
                <span> Registrarse</span>
              </button>
        </Link>
          </div>

          <div className="footer">
            <div>
              <img
                src="src\assets\logos\epn2.png"
                alt="epn"
              />
            </div>
            <div></div>
            <div>
              <img
                className="logo"
                src="src\assets\logos\ludologo.png"
                alt="ludolago"
              />
            </div>
            */}
          </div>
        </>
      ) : (
        <>
          {/* Componente de HOME */}
          <div
            //className="app-navigation"
            style={{ display: "flex", justifyContent: "flex-end" , marginLeft: 'auto', marginRight: '0.5%'}}
          >
            {/*<div className="user">
              <FaUserAlt />
              <span>{user.name}</span>
      </div>*/}
      
            <Button 
            //variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => setIsPopUpOpen(true)}
            variant="contained"
              color="primary"
            style={{
              fontSize: '20px', // Aumenta el tamaño del texto
              padding: '15px 30px', // Aumenta el relleno para hacer el botón más grande
              marginLeft: 'auto', // Mueve el botón a la derecha
            }}
            >
              Salir
            </Button>
            
          </div>
          {/*<img className="img-title" src="public\credits\title.png" alt="imagen de la aventura" />*/}
          <div className="home-content">
            {/*
            <img
              src="public\instructions\welcome-message.png"
              alt="imagen de la aventura"
            />
            */}
          </div>
          <div className="img-form">
            <img src="public\backgrounds\main.png" />
          </div>

          <div 
          //className="footer-button"
          >
            <div>
              <Link to="/main-menu" className="link-button">
                <Button
                //variant="outlined"
                variant="contained"
              color="primary"
                startIcon={<StartIcon />}
                style={{
                  fontSize: '20px', // Aumenta el tamaño del texto
                  padding: '15px 30px', // Aumenta el relleno para hacer el botón más grande
                }}
                >
                  Continuar
                </Button>
              </Link>
            </div>
            {/*
            <button
              onClick={() => {
                handleImageClick();
              }}
            >
              <FiVolume2 />
              <span>Audio</span>
            </button>
            */}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
