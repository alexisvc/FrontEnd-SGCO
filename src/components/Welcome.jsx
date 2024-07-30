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
import TimelineIcon from '@mui/icons-material/Timeline';
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
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Welcome({ user, logout, isGuestUser }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const navigate = useNavigate();

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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", position: "fixed", top: 0, padding: 8 }}>
  {isLoggedIn && (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ m: 2 }}
      >
        Atrás
      </Button>
    </>
  )}

  {isLoggedIn && (
    <>
      <Button
        startIcon={<LogoutIcon />}
        variant="contained"
        color="primary"
        onClick={() => setIsPopUpOpen(true)}
        sx={{ m: 2 }}
      >
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
      <div></div>

      {isLoggedIn && (
        <>
          <div>
            <div className="buttons-welcome">
              <Link to="/patients" className="link-button" style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                variant="contained"
                color="primary"
                startIcon={<AutoStoriesIcon style={{ fontSize: 40, marginRight: "140"}}/>}
                style={{
                  fontSize: '18px', 
                  padding: '20px', 
                  margin: '5%',
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  textAlign: 'center', 
                }}
                >
                  Historias Clinicas
                </Button>
              </Link>
            </div>
            <br></br>

            <div>
              <Link to="/main-menu" className="link-button" style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                variant="contained"
                color="primary"
                startIcon={<CalendarMonthIcon style={{ fontSize: 40, marginRight: "90" }}/>}
                style={{
                  fontSize: '18px', 
                  padding: '20px', 
                  margin: '5%',
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center', 
                  textAlign: 'center', 
                }}
                >
                    Agendamiento de Citas
                  </Button>
                </Link>
            </div>
            <br></br>
            <div>
              {user.username === 'admin' && (
                <Link to="/main-menu" className="link-button" style={{ textDecoration: 'none', width: '100%' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<TimelineIcon style={{ fontSize: 40, marginRight: "45" }}/>}
                    style={{
                      fontSize: '18px', 
                      padding: '20px', 
                      margin: '5%',
                      width: '100%', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      textAlign: 'center', 
                    }}
                  >
                    PLANIFICACIÓN Y PRESUPUESTO
                  </Button>
                </Link>
              )}
            </div>

        </div>
        </>
        
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
