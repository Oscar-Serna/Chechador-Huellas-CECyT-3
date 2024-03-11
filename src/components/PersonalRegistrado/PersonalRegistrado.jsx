import React, { useContext, useEffect, useState } from "react";
import { CardPersonalRegistrado } from "../CardPersonalRegistrado/CardPersonalRegistrado";

import { IoIosSearch } from "react-icons/io";

import "./PersonalRegistrado.css";

import { UsersContext } from "../../context/users.context";

import GigLoading from "../../img/loadingGIF.gif";

export const PersonalRegistrado = () => {
  const { allUsers, GetUsers } = useContext(UsersContext);

  useEffect(() => {
    GetUsers(true);
  }, []);

  function renderPersonal() {
    if(allUsers[0] === null){
      return (
        <p>
          <img src={GigLoading} alt="Gif de cargando el personal" style={{ width : "6rem" }} />
          <br />
          <span>
            Espere mientras obtenemos el personal
          </span>
        </p>
      )
    }

    if (allUsers.length === 0)
      return (
        <p>
          <b>No existe personal registrado...</b>
          <br />
          <span>
            Empiece a registrar personal en <b>"Agregar Personal"</b>
          </span>
        </p>
      );

    return allUsers.map((persona, index) => (
      <CardPersonalRegistrado
        key={index}
        index={index}
        id = {persona.id}
        nombre={persona.nombre}
        cedula={persona.cedula}
        rfc={persona.rfc}
        puesto={persona.puesto}
        num_huellas={persona.numHuellas}
      />
    ));
  }

  function searchPersonal(identifier) {
    const personal = document.querySelectorAll(".listaPersonal > ul > li");

    personal.forEach(persona => {
      const cedula = persona.dataset.cedula;
      const rfc = persona.dataset.rfc;
      const nombre = persona.dataset.nombre;
      const puesto = persona.dataset.puesto;

      if (
        !(
          cedula.includes(identifier) ||
          rfc.includes(identifier) ||
          nombre.includes(identifier) ||
          puesto.includes(identifier)
        )
      ) {
        persona.style.display = "none";
      } else {
        persona.style.display = "flex";
      }
    });
  }

  return (
    <section className="personalRegistrado">
      <article className="search">
        <h3>Personal que cuenta con huella dactilar</h3>
        <div>
          <IoIosSearch />
          <input
            type="text"
            placeholder="Buscar personal (nombre, cedula, rfc, puesto)"
            onChange={(e) => {
              searchPersonal(e.target.value.toUpperCase());
            }}
          />
        </div>
      </article>
      <article className="listaPersonal">
        <ul>{renderPersonal()}</ul>
      </article>
    </section>
  );
};
