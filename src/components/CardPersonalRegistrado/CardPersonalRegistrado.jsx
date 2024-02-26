import React, { useContext } from "react";

import "./CardPersonalRegistrado.css";

import { UsersContext } from "../../context/users.context";
import { EditarContext } from "../../context/editar.context";

export const CardPersonalRegistrado = ({
  index,
  id,
  cedula,
  nombre,
  puesto,
  rfc,
  num_huellas,
}) => {

  const { DeleteUser, UpdateUser } = useContext(UsersContext);
  const {
    setModalState,
    setIndexEmpleadoSeleccionado
  } = useContext(EditarContext);

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
          setModalState("activo");
          setIndexEmpleadoSeleccionado(index);
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
