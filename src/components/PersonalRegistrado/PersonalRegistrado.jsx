import React, { useContext, useEffect, useState } from "react";
import { CardPersonalRegistrado } from "../CardPersonalRegistrado/CardPersonalRegistrado";

import { IoIosSearch } from "react-icons/io";

import "./PersonalRegistrado.css";

import { UsersContext } from "../../context/users.context";

export const PersonalRegistrado = () => {

  const { allUsers } = useContext(UsersContext);

  function renderPersonal() {
    if (allUsers.length === 0)
      return (
        <p>
          <b>No existe personal registrado...</b>
          <br />
          <span>Empiece a registrar personal en <b>"Agregar Personal"</b></span>
        </p>
      );
    return allUsers.map((persona, index) => (
      <CardPersonalRegistrado
        key={index}
        id={index}
        nombre={persona.nombre}
        cedula={persona.cedula}
        rfc={persona.rfc}
        t_personal={persona.t_personal}
        num_huellas={persona.num_huellas}
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
