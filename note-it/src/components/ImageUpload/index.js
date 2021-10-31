import React from "react";
import Boton from "../../components/Boton/index.js";

import './index.css';

export default function ImageUpload(props) {
    const { imagen, setImagen, onChange, imagenPreview, setImagenPreview } = props

    const eliminarImagen = (e) => {
      e.preventDefault();
      setImagen(null);
      setImagenPreview(null);
    }

    return (
      <div className="contenedor">
        <input type="file" onChange={onChange} />
        <label>Imagen seleccionada: </label>
        {imagen && (
          <div className="imagenPreview">
            <img src={imagenPreview} alt="" />
            <Boton onClick={eliminarImagen} texto="Eliminar" tipo="principal" />
          </div>
        )}
      </div>
    );
}