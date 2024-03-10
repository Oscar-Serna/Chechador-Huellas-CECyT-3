import axios from "axios";
import { BASE_URL } from "./baseURL.js";

export const Services_Authentication = async (password) => {

  try {

    const { data } = await axios.get(`${BASE_URL}/auth`, { headers : { AuthorizationKey : "un1d4d1nf0rm4t1c4c3cyt3", password : password } });

    // console.log(data)

    return data;

  } catch (error) {
    console.log("Error en user.services.js - Services_Authentication");
    console.log(error);
    return false;
  }

}

export const Services_GetAllUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/empleados/obtenerEmpleados`, { headers: { AuthorizationKey : "un1d4d1nf0rm4t1c4c3cyt3" } });

    return data;
  } catch (error) {
    console.error("Error en users.services.js - GetAllUsers");
    console.info(error);
  }
}

export const Services_GetUser = async (empleadoCedula) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/empleados/ObtenerEmpleado`, { headers: { AuthorizationKey : "un1d4d1nf0rm4t1c4c3cyt3", cedula : empleadoCedula } });

    return data;
  } catch (error) {
    console.error("Error en users.services.js - GetUser");
    console.info(error);
  }
}

export const Services_CreateUser = async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/empleados/crearEmpleado`, userData, { headers: { AuthorizationKey : "un1d4d1nf0rm4t1c4c3cyt3" }});

    return data;
  } catch (error) {
    console.error("Error en user.services.js - CreateUser");
    console.info(error);
  }
}

export const Services_DeleteUser = async (empleadoCedula) => {
  try {
    const result = await axios.delete(`${BASE_URL}/empleados/eliminarEmpleado`, { headers: { AuthorizationKey : "un1d4d1nf0rm4t1c4c3cyt3", cedula : empleadoCedula }});

    return result;
  } catch (error) {
    console.error("Error en user.services.js - DeleteUser");
    console.info(error);
  }
}

export const Services_UpdateUser = async (userData) => {

  try {

    const { data } = await axios.put(`${BASE_URL}/empleados/modificarEmpleado`, userData, { headers : { AuthorizationKey : "un1d4d1nf0rm4t1c4c3cyt3" } });

    return data;

  } catch (error) {
    console.log("Error en Services_UpdateUser - users.services.js");
    console.log(error);
  }

}