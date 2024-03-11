import React, { createContext, useState } from "react";

import {
  Services_Authentication,
  Services_CreateUser,
  Services_DeleteUser,
  Services_GetAllUsers,
  Services_GetUser,
  Services_UpdateUser,
} from "../services/users.services";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([null]);

  const [userCompared, setUserCompared] = useState(null);

  function GetUsers(isAll, cedula) {
    if (isAll === true) {
      const fetchGetUsers = async () => {
        const result = await Services_GetAllUsers();

        setAllUsers(result);

        return result;
      };

      fetchGetUsers();
    }

    if (cedula != null) {
      if (cedula.trim() === "") throw new Error("Debes de ingresar un RFC");

      const fetchGetUsers = async () => {
        const result = await Services_GetUser(cedula);

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

        if (dataResponse === "CREADO"){
          deleteLocalStorage(true);
          return dataResponse;
        }
        if (dataResponse === "ERROR") {
          alert("Hubo un error al agregar el miembro");
          deleteLocalStorage(true);
        }
        if (dataResponse.saveInServer === "YA EXISTE") alert("Este usuario ya existe");

      });
    };

    return fetchCreateUser();
  }

  function DeleteUser(cedula, nombre) {
    const password = prompt(
      `¿Eliminar a ${cedula} | ${nombre}?\nIntroduzca la contraseña:`
    );

    if (!password) return;


    async function fetchAuthentication(){

      await Services_Authentication(password.trim()).then(resultAuthentication => {

        if(resultAuthentication === true){

          async function fetcDeleteUser(){

            await Services_DeleteUser(cedula).then((_) => {

              GetUsers(true);

            })

          }

          fetcDeleteUser();

        }else return DeleteUser(cedula, nombre);

      })

    }

    fetchAuthentication();

  }

  function UpdateUser(
    nombre,
    cedula,
    cedulaOriginal,
    rfc,
    puesto,
    turno,
    seModificanHuellas,
    huellasModificadas
  ) {

    const fetchUpdate = async () => {

      const result = await Services_UpdateUser(
        { nombre, cedula, cedulaOriginal, rfc, puesto, turno, seModificanHuellas, huellasModificadas }
      ).then(result => {
        GetUsers(true);
        return result;
      })

      return result;

    }

    return fetchUpdate();
  }

  return (
    <UsersContext.Provider
      value={{
        allUsers,
        userCompared,
        GetUsers,
        CreateUser,
        DeleteUser,
        UpdateUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
