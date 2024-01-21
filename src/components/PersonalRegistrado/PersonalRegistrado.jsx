import React, { useState } from "react";
import { CardPersonalRegistrado } from "../CardPersonalRegistrado/CardPersonalRegistrado";

import { IoIosSearch } from "react-icons/io";

import "./PersonalRegistrado.css";

export const PersonalRegistrado = () => {
  const [personal, setPersonal] = useState([]);

  function renderPersonal() {
    if (personal.length === 0)
      return (
        <p>
          <b>No existe personal registrado...</b>
          <br />
          <span>Empiece a registrar personal en <b>"Agregar Personal"</b></span>
        </p>
      );
    personal.map((persona, index) => (
      <CardPersonalRegistrado
        key={index}
        id={index}
        nombre={persona.nombre}
        numEmpleado={persona.numEmpleado}
      />
    ));
  }

  return (
    <section className="personalRegistrado">
      <article className="search">
        <h3>Personal que cuenta con huella digital</h3>
        <div>
          <IoIosSearch />
          <input type="text" placeholder="Buscar personal" />
        </div>
      </article>
      <article className="listaPersonal">
        <ul>{renderPersonal()}</ul>
      </article>
    </section>
  );
};
