import React from "react";
import Boton from "../../components/Boton/index.js";

import './index.css';

export default function ImageUpload(props) {
    const { imagen, onChange, imagenPreview, setImagenPreview } = props

    const eliminarImagen = (e) => {
      e.preventDefault();
      imagen.current.value = "";
      setImagenPreview(null);
    }

    return (
      <div className="contenedor">
        <label>Imagen seleccionada: </label>
        <input
          type="file"
          onChange={onChange}
          accept="image/png, image/jpg, image/jpeg"
          ref={imagen}
        />
        {imagenPreview && (
          <div className="imagenPreview">
            <img src={imagenPreview} alt="Imagen seleccionada" />
            <Boton onClick={eliminarImagen} texto="Eliminar" tipo="principal" />
          </div>
        )}
      </div>
    );
}