import React from "react";

export const CardPersonalRegistrado = ({ id, cedula, nombre, rfc, num_huellas}) => {

  return (
    <li>
      <p>{nombre} Cedula: {cedula} Num huellas: {num_huellas} RFC: {rfc}</p>
    </li>
  )
}