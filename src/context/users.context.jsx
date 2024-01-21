import React, { createContext } from "react";

import { Services_CreateUser, Services_GetAllUsers, Services_GetUser } from "../services/users.services";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {

  function GetUsers (isAll, rfc) {

    if(isAll === true) {

      const fetchGetUsers = async () => {

        const result = await Services_GetAllUsers();

        console.log(result);

        return result;

      }

      fetchGetUsers();

    }

    if(rfc != null) {

      if(rfc.trim() === '') throw new Error("Debes de ingresar un RFC");

      const fetchGetUsers = async () => {

        const result = await Services_GetUser(rfc);

        console.log(result);

        return result;

      }

      fetchGetUsers();

    }



  }

  function CreateUser (nombre, cedula, rfc, t_personal, turno, huellas) {

    const fetchCreateUser = async () => {

      const result = await Services_CreateUser({ nombre, cedula, rfc, t_personal, turno, huellas });

      console.log(result);

      return result;
    }

    fetchCreateUser();

  }

  return(
    <UsersContext.Provider value={{
      GetUsers,
      CreateUser
    }}>
      { children }
    </UsersContext.Provider>
  )
}