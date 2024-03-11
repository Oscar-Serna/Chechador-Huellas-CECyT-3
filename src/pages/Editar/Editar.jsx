import React from "react";

import { ModalEditar } from "../../components/ModalEditar/ModalEditar";


import { OpcionesEditar } from "../../components/OpcionesEditar/OpcionesEditar";

import { UsersContextProvider } from "../../context/users.context";


export const Editar = () => {



  return (
    <section>
      <UsersContextProvider>
        <OpcionesEditar />
        <ModalEditar />
      </UsersContextProvider>
    </section>
  )

}