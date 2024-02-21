import React, { createContext, useState } from "react";

import {
  Services_CreateUser,
  Services_DeleteUser,
  Services_GetAllUsers,
  Services_GetUser,
} from "../services/users.services";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  const [userCompared, setUserCompared] = useState(null);

  function GetUsers(isAll, cedula) {
    if (isAll === true) {
      const fetchGetUsers = async () => {
        const result = await Services_GetAllUsers();

        setAllUsers(result);

        console.log("AllUsers", result);

        return result;
      };

      fetchGetUsers();
    }

    if (cedula != null) {
      if (cedula.trim() === "") throw new Error("Debes de ingresar un RFC");

      const fetchGetUsers = async () => {
        const result = await Services_GetUser(cedula);

        console.log("RESULT DEL FETCH USER: ", result);

        setUserCompared(result);

        return result;
      };

      fetchGetUsers();
    }
  }

  function CreateUser(
    nombre,
    cedula,
    rfc,
    puesto,
    turno,
    huellasBase64,
    deleteLocalStorage
  ) {
    const fetchCreateUser = async () => {
      const num_huellas = huellasBase64.length;

      await Services_CreateUser({
        nombre,
        cedula,
        rfc,
        puesto,
        turno,
        num_huellas,
        huellasBase64,
      }).then(dataResponse => {

        if (dataResponse === "CREADO")
          return deleteLocalStorage(true);
        if (dataResponse === "ERROR") {
          alert("Hubo un error al agregar el miembro");
          deleteLocalStorage(true);
        }
        if (dataResponse.saveInServer === "YA EXISTE") alert("Este usuario ya existe");

      });
    };

    fetchCreateUser();
  }

  function DeleteUser(cedula, nombre) {
    const promptDelete = prompt(
      `ELIMINAR PERSONAL\nIntroduzca la cédula de ${nombre} - ${cedula}:`
    );

    if (!promptDelete) return;

    if (promptDelete != cedula.toString()) {
      alert("Incorrecto... Vuelva a intentarlo");
      DeleteUser(cedula, nombre);
      return;
    }

    const fetcDeleteUser = async () => {
      const data = await Services_DeleteUser(cedula).then((_) => {
        GetUsers(true);
      });

      return data;
    };

    fetcDeleteUser();
  }

  return (
    <UsersContext.Provider
      value={{
        allUsers,
        userCompared,
        GetUsers,
        CreateUser,
        DeleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
