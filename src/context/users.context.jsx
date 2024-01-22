import React, { createContext, useEffect, useState } from "react";

import {
  Services_CreateUser,
  Services_GetAllUsers,
  Services_GetUser,
} from "../services/users.services";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {

  const [ allUsers, setAllUsers ] = useState([]);

  useEffect(() => {
    GetUsers(true);
  }, []);

  function GetUsers(isAll, rfc) {
    if (isAll === true) {
      const fetchGetUsers = async () => {
        const result = await Services_GetAllUsers();

        setAllUsers(result);

        console.log("AllUsers", result)

        return result;
      };

      fetchGetUsers();
    }

    if (rfc != null) {
      if (rfc.trim() === "") throw new Error("Debes de ingresar un RFC");

      const fetchGetUsers = async () => {
        const result = await Services_GetUser(rfc);

        console.log(result);

        return result;
      };

      fetchGetUsers();
    }
  }

  function CreateUser(nombre, cedula, rfc, t_personal, turno, huellas) {
    const fetchCreateUser = async () => {
      const data = await Services_CreateUser({
        nombre,
        cedula,
        rfc,
        t_personal,
        turno,
        huellas,
      });

      if (data.saveServer === "Exitoso")
        alert("El miembro fue registrado con éxito");
      if (data.saveServer === "Error")
        alert("Hubo un error al agregar el miembro");
      if (data.saveServer === "Existe") alert("Este usuario ya existe");

      window.location.reload();

      return data;
    };

    fetchCreateUser();
  }

  return (
    <UsersContext.Provider
      value={{
        allUsers,

        GetUsers,
        CreateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
