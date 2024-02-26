import React from "react";

import "./OpcionesRegistro.css";

import { MdOutlinePersonAdd } from "react-icons/md";


export const OpcionesRegistro = ({ animationRegistro }) => {

  return (
    <section className="opcionesRegistro">
      <article className="options">
        <div>
          <MdOutlinePersonAdd />
          <input type="button" value="Agregar personal" onClick={() => {
            animationRegistro();
          }}/>
        </div>
      </article>
    </section>
  )
}