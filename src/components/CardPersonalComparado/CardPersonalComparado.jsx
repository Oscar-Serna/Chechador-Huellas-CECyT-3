import React from "react";

import "./CardPersonalComparado.css";

export const CardPersonalComparado = ({
  nombre,
  cedula,
  rfc,
  imagenBase64,
}) => {
  return (
    <article className="cardPersonalRegistrado">
      <h3>¡BIENVENIDO!</h3>
      <div className="containerInfoPersonalRegistrado">
        <div className="imagenPersonalRegistrado">
          <img
            src={`data:image/jpeg;base64,${imagenBase64}`}
            alt={`Imágen de ${nombre} no encontrada`}
          />
        </div>
        <div className="infoPersonalRegistrado">
          <p className="nombre">{nombre}</p>
          <p className="cedula">CÉDULA: {cedula}</p>
        </div>
      </div>
    </article>
  );
};
