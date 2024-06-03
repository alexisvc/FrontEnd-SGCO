import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PictogramMenu.css";
import {
  FaArrowCircleLeft,
  FaBookOpen,
  FaHome,
  FaList,
  FaPen,
  FaPlus,
  FaQuestion,
  FaYoutube,
} from "react-icons/fa";
import { FiVolume2 } from "react-icons/fi";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import { useNavigate } from "react-router-dom";
import PopUpHelp from "../extras/PopUpHelp";
import PopUpInstructions from "../extras/PopUpInstructions";

function PictogramMenu() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpOpenInstructions, setIsPopUpOpenInstructions] = useState(false);
  const { speak, speaking } = useSpeechSynthesis();
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (!speaking) {
      speak("Personaliza y organiza tus pictogramas aquí.");
    }
  };

  return (
    <div className="pictogram-menu">
      {isPopUpOpen && (
        <PopUpHelp
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          url={"https://www.youtube.com/watch?v=ANG0-z1qLgw"}
        />
      )}
      {isPopUpOpenInstructions && (
        <PopUpInstructions
          instructions={"Personaliza y organiza tus pictogramas aquí."}
          url={"public/instructions/bosque-message.png"}
          onClose={() => {
            setIsPopUpOpenInstructions(false);
          }}
        />
      )}
      <div className="app-navigation">
        <button
          onClick={() => {
            navigate("/main-menu");
          }}
        >
          <FaArrowCircleLeft />
          <span>Atrás</span>
        </button>
        <button
          onClick={() => {
            navigate("/main-menu  ");
          }}
        >
          <FaHome />
          <span>Inicio</span>
        </button>
        {/*<h1>Menú de Pictogramas</h1>*/}
        <h1>Bosque de los símbolos</h1>
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
      <div className="pictogram-content">
        <img src="public\instructions\bosque-message.png" alt="Imagen de la Aventura" />
        <div className="buttons">
          <Link to="/pictogram-list" className="link-button">
            <button>
              <FaList />
              <span className="btn-txt">Listar Pictogramas</span>
            </button>
          </Link>

          <Link to="/pictogram-form" className="link-button">
            <button>
              <FaPlus />
              <span className="btn-txt">Crear un nuevo Pictograma</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="footer-button">
        <button
          onClick={() => {
            handleImageClick();
          }}
        >
          <FiVolume2 />
          <span>Audio</span>
        </button>
      </div>
    </div>
  );
}

export default PictogramMenu;
