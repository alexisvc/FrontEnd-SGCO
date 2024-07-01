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
        className="app-navigation"
        style={{ display: "flex", justifyContent: "flex-end", marginTop: "-8rem" }}
      >
        {isLoggedIn && (
          <>
            <button onClick={() => setIsPopUpOpen(true)}>
              <FaSignOutAlt />
              <span>Salir</span>
            </button>
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
            <button>
              <span>Historias Clinicas</span>
            </button>
          </Link>

          <Link to="/acc-menu" className="link-button">
            <button>
              <span>Agendamiento</span>
            </button>
          </Link>

          <Link to="/game-menu" className="link-button">
            <button>
              <span>Planificación y Presupuesto</span>
            </button>
          </Link>
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
