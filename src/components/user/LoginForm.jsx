import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import {
  FaArrowCircleLeft,
  FaBook,
  FaBookOpen,
  FaHome,
  FaQuestion,
  FaYoutube,
} from "react-icons/fa";
import PopUpHelp from "../extras/PopUpHelp";
import PopUpInstructions from "../extras/PopUpInstructions";

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
      toast.success("¡Felicidades! Tu ingreso fue exitoso.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error al ingresar:", error);
      toast.error(
        "Credenciales son incorrectas. Por favor, inténtalo de nuevo.",
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
      <ToastContainer />
      {isPopUpOpen && (
        <PopUpHelp
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          url={"https://www.youtube.com/watch?v=vPZLE8mEOFw"}
        />
      )}
      {isPopUpOpenInstructions && (
        <PopUpInstructions
          instructions={"Para iniciar sesión ingresa tu correo y contraseña."}
          url={"public/instructions/login-message.png"}
          onClose={() => {
            setIsPopUpOpenInstructions(false);
          }}
        />
      )}
      <div className="app-navigation">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <FaArrowCircleLeft />
          <span>Atrás</span>
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <FaHome />
          <span>Inicio</span>
        </button>
        <h1>PictoAndes</h1>
        <button
          onClick={() => {
            setIsPopUpOpenInstructions(true);
          }}
        >
          <FaQuestion />
          <span>Indicaciones</span>
        </button>
        <button
          onClick={() => {
            setIsPopUpOpen(true);
          }}
        >
          <FaYoutube />
          <span>Ayuda</span>
        </button>
      </div>
      <div className="login">
        <div className="login-form">
          <h2 className="login-heading">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="form-input">
              <label htmlFor="username">
              <p>Correo Electrónico:</p>
              </label>
              <input
              id="username"
                type="text"
                placeholder="Ingresa tu correo electrónico. Ej: alexis@correo.com"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-input">
              <label htmlFor="password">
              <p>Contraseña:</p>
              </label>
              <div className="password-field">
                <input
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
            <div>
              <button className="login-button">Ingresar</button>
            </div>
          </form>
          <div className="footer-login">
            <p>
              ¿No tienes una cuenta?
              <Link to="/register" className="login-link">
                {" "}
                Regístrate ahora
              </Link>
            </p>
          </div>
        </div>
        <div className="img-form">
          <img
            src="public\characters\andino.png"
            alt="Andino"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
