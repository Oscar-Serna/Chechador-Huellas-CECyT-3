import React from "react";

import { FiHome } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";

import "./OpcionesEditar.css";

export const OpcionesEditar = () => {

  function GoToInicio(){
    window.location.href = "/";
  }

  function GoToAlta(){
    window.location.href = "/#/alta"
  }

  return(
    <section className="OpcionesEditar">

      <div className="opcionEditar" onClick={() => {
        GoToInicio();
      }}>
        <FiHome />
        <h4>Regresar a Inicio</h4>
      </div>
      <div className="opcionEditar" onClick={() => {
        GoToAlta();
      }}>
        <IoMdPerson />
        <h4>Regresar a Alta</h4>
      </div>

    </section>
  )
}