import React from "react";

import "./OpcionesRegistro.css";

import { MdOutlinePersonAdd } from "react-icons/md";
import { IoFingerPrint } from "react-icons/io5";


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
        <div>
          <IoFingerPrint />
          <input type="button" value="Asignar huellas digitales" onClick={() => {}}/>
        </div>
      </article>
    </section>
  )
}