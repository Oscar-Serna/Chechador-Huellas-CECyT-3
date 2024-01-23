import React, { useContext } from "react";

import "./CardPersonalRegistrado.css";

import { UsersContext } from "../../context/users.context";

export const CardPersonalRegistrado = ({
  id,
  cedula,
  nombre,
  t_personal,
  num_huellas,
}) => {

  const { DeleteUser } = useContext(UsersContext);

  return (
    <li className="cardPersonal">
      <div className="información">
        <h3>{id + 1}.-</h3>
        <p>
          <b>{cedula}</b>:&nbsp; {nombre} &nbsp; | &nbsp; {t_personal} &nbsp; |
          &nbsp; Huellas: <b>{num_huellas}</b>
        </p>
      </div>
      <ul className="opciones">
        <li onClick={() => {
          DeleteUser(cedula, nombre);
        }}>Eliminar personal</li>
      </ul>
    </li>
  );
};
