import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import LoginIcon from '@mui/icons-material/Login';
import PopUpHelp from "../extras/PopUpHelp";
import PopUpInstructions from "../extras/PopUpInstructions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from '@mui/icons-material/Home';
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

export const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpOpenInstructions, setIsPopUpOpenInstructions] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password });
      setUsername("");
      setPassword("");
      toast.success("Ingreso exitoso.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error al ingresar:", error);
      toast.error(
        "Credenciales incorrectas. Inténtalo de nuevo.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login-content">
      <Container maxWidth={false} direction="row">
        
          {/* Cabecera con botones y título */}
          <Grid >
              {/* Botones */}
              <Grid container justifyContent="flex-start" sx={{marginTop:1}}>
                <Button
                  variant="outlined"
                  sx={{marginRight: 2}}
                  startIcon={<ArrowBackIcon />}
                  size="large"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Atrás
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  size="large"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Inicio
                </Button>
              </Grid>
              
                {/* Título */}
                <Grid item xs>
                  <h1 style={{ textAlign: "center" }}>MP Especialidades Odontológicas</h1>
                </Grid>
                
                
              
    
            </Grid>
              

      </Container>
      

      <div className="login">
        <div className="login-form">
          <h2 className="login-heading">Iniciar Sesión</h2>
          <br />
          
          <form onSubmit={handleLogin}>
            <div className="form-input">
              <label htmlFor="username">
              <p>Correo Electrónico:</p>
              </label>
              <TextField
              fullWidth
              id="username"
                type="text"
                placeholder="Ingresa tu correo electrónico."
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <br />
            <div className="form-input">
              <label htmlFor="password">
              <p>Contraseña:</p>
              </label>
              <div className="password-field">
                <TextField
                //fullWidth
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-icon"
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
              <Button 
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              className="login-button"
              size="large"
              >
                Ingresar
                </Button>
            </div>
          </form>
{/*
          <div className="footer-login">
            <p>
              ¿No tienes una cuenta?
              <Link to="/register" className="login-link">
                {" "}
                Regístrate ahora
              </Link>
            </p>
          </div>
*/}
        </div>
        
        <div className="img-form">
          <img
            src="public\backgrounds\main.png"
            alt="Andino"
          />
        </div>
        
      </div>
    </div>
  );
};

export default LoginForm;
