import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import {
  FaGamepad,
  FaList,
  FaMountain,
  FaSignOutAlt,
  FaTable,
  FaTree,
  FaUserAlt,
} from "react-icons/fa";
import PopUpExit from "./extras/PopUpExit";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
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

function Welcome({ user, logout, isGuestUser }) {
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
      <div
        //className="app-navigation"
        //style={{ display: "flex", justifyContent: "flex-end", marginTop: "-8rem" }}
        style={{ display: "flex", justifyContent: "flex-end" , marginLeft: 'auto', marginRight: '0.5%', marginTop: "-6%"}}
          
      >
        {isLoggedIn && (
          <>
            <Button 
            startIcon={<LogoutIcon />}
            
            variant="contained"
              color="primary"
            style={{
              fontSize: '20px', // Aumenta el tamaño del texto
              padding: '15px 30px', // Aumenta el relleno para hacer el botón más grande
              marginLeft: 'auto', // Mueve el botón a la derecha
            }}
            onClick={() => setIsPopUpOpen(true)}>
              
              Salir
            </Button>
          </>
        )}
      </div>
      {/*<img
        className="img-home"
        src="public\credits\home.png"
        alt="imagen de la aventura"
      />*/}

      {isLoggedIn && (
        <div className="buttons-welcome">
          <Link to="/patients" className="link-button">
            <Button
            variant="contained"
            color="primary"
            startIcon={<AutoStoriesIcon />}
            style={{
              fontSize: '15px', // Aumenta el tamaño del texto
              padding: '10px 20px', // Aumenta el relleno para hacer el botón más grande
              margin:'3%',
            }}
            >
              Historias Clinicas
            </Button>
          </Link>

          <Link to="/acc-menu" className="link-button">
            <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            style={{
              fontSize: '15px', // Aumenta el tamaño del texto
              padding: '10px 20px', // Aumenta el relleno para hacer el botón más grande
              margin:'3%',
           }}>
              Agendamiento de Citas
            </Button>
          </Link>

           { user.username=='admin' && (
            <Link to="/game-menu" className="link-button">
            <Button
            variant="contained"
            color="primary"
            startIcon={<AccountBalanceWalletIcon />}
            style={{
              fontSize: '15px', // Aumenta el tamaño del texto
              padding: '10px 20px', // Aumenta el relleno para hacer el botón más grande
              margin:'3%',
            }}>
              Planificación y Presupuesto
            </Button>
          </Link>
           )}
          
        </div>
      )}
      
      <div className="footer">
        
        <div>
          {/*<p>Realizado por: Vizuete Alexis</p>
          <p>© 2024 PictoAndes</p>*/}
        </div>
        
      </div>
      
    </div>
  );
}

export default Welcome;
