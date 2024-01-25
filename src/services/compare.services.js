import axios from "axios";
import { BASE_URL } from "./baseURL.js";

export const Services_CompareFingerprint = async (fingerprint) => {
  try {
    // HACEMOS LA PETICIÓN POST PARA MANDAR LA IMAGEN EN BASE64 POR LA CADENA TAN LARGA Y NO PERDER DATOS O QUE HAYA PROBLEMAS DE URL
    const { data } = await axios.post(`${BASE_URL}/api/compare/`, { fingerprint });

    console.log(data.compare);
  } catch (error) {}
};
