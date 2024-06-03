import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
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
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {isLoggedIn && (
          <>
            {/*<button className="user">
              <Link to="/edit-user" className="link-button">
                <FaUserAlt />
                <span>{user.name}</span>
              </Link>
        </button>*/}
            <button onClick={() => setIsPopUpOpen(true)}>
              <FaSignOutAlt />
              <span>Salir</span>
            </button>
          </>
        )}
      </div>
      <img
        className="img-home"
        src="public\credits\home.png"
        alt="imagen de la aventura"
      />

      {isLoggedIn && (
        <div className="buttons-welcome">
          {!isGuestUser && (
            <Link to="/pictogram-menu" className="link-button">
              <button>
                <span>🌳</span>
                <span>Bosque de los Símbolos</span>

                {/*
              <span>Pictogramas</span>*/}
              </button>
            </Link>
          )}

          <Link to="/acc-menu" className="link-button">
            <button>
              <span>🏔️</span>
              <span>Valle de los Pictogramas</span>
              {/*<FaTable />
              <span>Tablero de Comunicación</span>*/}
            </button>
          </Link>

          <Link to="/game-menu" className="link-button">
            <button>
              <span>🌎</span>
              <span>Planeta de los Símbolos</span>
              {/*<FaGamepad />
              <span>Juego de Reconocimiento</span>*/}
            </button>
          </Link>
        </div>
      )}
      <div className="footer">
        <div>
          <img src="src\assets\logos\epn2.png" alt="imagen de la aventura" />
        </div>
        <div>
          {/*<p>Realizado por: Vizuete Alexis || Tutora: Dra. Carrión Mayra</p>
          <p>© 2024 PictoAndes</p>*/}
        </div>
        <div>
          <img
            src="src\assets\logos\ludologo.png"
            alt="imagen de la aventura"
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
