import React, { useState } from "react";
import {
  FaArrowCircleLeft,
  FaBookOpen,
  FaHome,
  FaQuestion,
  FaSave,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import "./PictogramForm.css";
import PopUpHelp from "../extras/PopUpHelp";
import PopUpInstructions from "../extras/PopUpInstructions";

export default function PictogramForm({ createPictogram, pictograms }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isPopUpOpenInstructions, setIsPopUpOpenInstructions] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("Personalizados");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const uniqueCategories = [
    ...new Set(pictograms.map((pictogram) => pictogram.category)),
  ].sort();

  // Mueve "Personalizados" al principio si ya existe, o agrégalo al principio si no existe
  if (uniqueCategories.includes("Personalizados")) {
    uniqueCategories.unshift(
      ...uniqueCategories.splice(uniqueCategories.indexOf("Personalizados"), 1)
    );
  } else {
    uniqueCategories.unshift("Personalizados");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameValue);
    formData.append("category", categoryValue);
    formData.append("image", image);

    try {
      await createPictogram(formData);
      // Notificación de éxito
      toast.success("Pictograma creado exitosamente", {
        position: "top-right",
        autoClose: 3000,
      });
      setNameValue("");
      setCategoryValue("");
      setImage(null);

      navigate("/pictogram-menu");
    } catch (error) {
      // Notificación de error
      toast.error("Error al crear el pictograma.", {
        position: "top-right",
        autoClose: 3000,
      });
      setNameValue("");
      setCategoryValue("");
      setImage(null);
    }
  };

  return (
    <div className="create-content">
      {isPopUpOpen && (
        <PopUpHelp
          onClose={() => {
            setIsPopUpOpen(false);
          }}
          url={"https://www.youtube.com/watch?v=DDQAYmTw2fM"}
        />
      )}
      {isPopUpOpenInstructions && (
        <PopUpInstructions
          instructions={"Da vida a tus ideas creando nuevos pictogramas aquí."}
          url={"public/instructions/create-message.png"}
          onClose={() => {
            setIsPopUpOpenInstructions(false);
          }}
        />
      )}
      <div className="app-navigation">
        <button
          onClick={() => {
            navigate("/pictogram-menu");
          }}
        >
          <FaArrowCircleLeft />
          <span>Atrás</span>
        </button>
        <button
          onClick={() => {
            navigate("/main-menu");
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
      <div className="pictogram-form-container">
        <div className="form-section">
          <h3>Crear un nuevo Pictograma</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="name">
              <p>Nombre:</p>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ingresa un Nombre"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-input">
              <label htmlFor="category">
              <p>Categoría:</p>
              </label>
              <select
                id="category"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                required
              >
                {uniqueCategories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    style={{
                      fontWeight: category === "Personalizados" ? "bold" : "normal",
                      color: category === "Personalizados" ? "red" : "black",
                    }}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-input">
              <label htmlFor="image">
              <p>Imagen:</p>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="input-field"
              />
            </div>
            <div className="button-container">
              <button>
                <FaSave />
                <span>Guardar</span>
              </button>
              <button onClick={() => navigate("/pictogram-menu")}>
                <FaTimes />
                <span>Cancelar</span>
              </button>
            </div>
          </form>
        </div>
        <div className="img-form">
          <img
            src="public\characters\andino.png"
            alt="Imagen de la Aventura"
          />
        </div>
      </div>
    </div>
  );
}
