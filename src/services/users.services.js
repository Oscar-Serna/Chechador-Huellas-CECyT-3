import axios from "axios";
import { baseURL } from "./baseURL";

export const Services_GetAllUsers = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/api/users/?all=true&rfc='null'`);

    return data;
  } catch (error) {
    console.error("Error en users.services.js - GetAllUsers");
    console.info(error);
  }
}

export const Services_GetUser = async (rfc) => {
  try {
    const { data } = await axios.get(`${baseURL}/api/users/?all=false&rfc='${rfc}'`);

    return data;
  } catch (error) {
    console.error("Error en users.services.js - GetUser");
    console.info(error);
  }
}

export const Services_CreateUser = async (userData) => {
  try {
    const { data } = await axios.post(`${baseURL}/api/users/`, userData);

    return data;
  } catch (error) {
    console.error("Error en user.services.js - CreateUser");
    console.info(error);
  }
}

export const Services_DeleteUser = async (cedula) => {
  try {
    const result = await axios.delete(`${baseURL}/api/users/?cedula=${cedula}`);

    return result;
  } catch (error) {
    console.error("Error en user.services.js - DeleteUser");
    console.info(error);
  }
}