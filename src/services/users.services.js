import axios from "axios";
import { baseURL } from "./baseURL";

export const GetAllUsers = async () => {
  try {
    const result = await axios.get(`${baseURL}/api/users/?all=true&rfc='null'`);

    return result;
  } catch (error) {
    console.error("Error en users.services.js - GetAllUsers");
    console.info(error);
  }
}

export const GetUser = async (RFC) => {
  try {
    const result = await axios.get(`${baseURL}/api/users/?all=false&rfc='${RFC}'`);

    return result;
  } catch (error) {
    console.error("Error en users.services.js - GetUser");
    console.info(error);
  }
}

export const CreateUser = async (userData) => {
  try {
    const result = await axios.post(`${baseURL}/api/users/`, userData);

    return result;
  } catch (error) {
    console.error("Error en user.services.js - CreateUser");
    console.info(error);
  }
}