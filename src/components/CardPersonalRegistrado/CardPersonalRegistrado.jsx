import React, { useContext } from "react";

import "./CardPersonalRegistrado.css";

import { UsersContext } from "../../context/users.context";

export const CardPersonalRegistrado = ({
  index,
  id,
  cedula,
  nombre,
  puesto,
  rfc,
  num_huellas,
}) => {

  const { DeleteUser } = useContext(UsersContext);

  function RedirectToEditar(indexEmpleado){
    window.location.href = `/#/editar/?index=${indexEmpleado}`;
  }

  return (
    <li className="cardPersonal" data-cedula={cedula} data-rfc={rfc} data-nombre={nombre} data-puesto={puesto}>
      <div className="información">
        <h3>{index + 1}.-</h3>
        <p>
          <b>{cedula}</b>:&nbsp; {nombre} &nbsp; | &nbsp; {puesto} &nbsp; |
          &nbsp; Huellas: <b>{num_huellas}</b>
        </p>
      </div>
      <ul className="opciones">
        <li className="editar" onClick={() => {
          RedirectToEditar(index);
        }}>
          Editar personal
        </li>
        <li className="eliminar" onClick={() => {
          DeleteUser(cedula, nombre);
        }}>Eliminar personal</li>
      </ul>
    </li>
  );
};
