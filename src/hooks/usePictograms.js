import { useState, useEffect } from "react";
import pictogramServices from "../services/pictograms";

export function usePictograms(user) {
  const [pictograms, setPictograms] = useState([]);

  // Traer pictogramas del usuario
  useEffect(() => {
    if (user) {
      pictogramServices.getPictogramsByUserId(user.id).then((response) => {
        setPictograms(response);
      });
    }
  }, [user]);

  // Crear pictograma
  const createPictogram = (pictogramObject) => {
    pictogramServices
      .createPictogram(pictogramObject)
      .then((newPictogram) => {
        setPictograms(pictograms.concat(newPictogram));
      })
      .catch((error) => {
        console.error("Error al crear el pictograma:", error);
      });
  };

  // Actualizar pictograma
  const updatePictogram = (id, pictogramObject) => {
    pictogramServices
      .updatePictogram(id, pictogramObject)
      .then((updatedPictogram) => {
        setPictograms(
          pictograms.map((pictogram) =>
            pictogram.id !== id ? pictogram : updatedPictogram
          )
        );
      }
      ).catch((error) => {
        console.error("Error al actualizar el pictograma:", error);
      });
  }

  //Eliminar pictograma
  const deletePictogram = (id) => {
    pictogramServices
      .deletePictogram(id)
      .then(() => {
        setPictograms(pictograms.filter((pictogram) => pictogram.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el pictograma:", error);
      });
  }

  return {
    pictograms,
    createPictogram,
    updatePictogram,
    deletePictogram
  };
}
