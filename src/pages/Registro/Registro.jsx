import React, { useState } from "react";

import { OpcionesRegistro } from "../../components/OpcionesRegistro/OpcionesRegistro";
import { PersonalRegistrado } from "../../components/PersonalRegistrado/PersonalRegistrado";
import { ModalRegistro } from "../../components/ModalRegistro/ModalRegistro";

import { UsersContextProvider } from "../../context/users.context";

export const Registro = () => {
  const [modalRegistroState, setModalRegistroState] = useState("inactivo");

  function AnimationModalRegistro() {
    if (modalRegistroState === "inactivo") setModalRegistroState("activo");
    else setModalRegistroState("inactivo");
  }

  return (
    <>
      <OpcionesRegistro animationRegistro={AnimationModalRegistro} />
      <UsersContextProvider>
        <PersonalRegistrado />
        <ModalRegistro
          modalState={modalRegistroState}
          animationRegistro={AnimationModalRegistro}
        />
      </UsersContextProvider>
    </>
  );
};
