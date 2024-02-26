import React, { useContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { UsersContext } from "../../context/users.context";
import { CardPersonalComparado } from "../../components/CardPersonalComparado/CardPersonalComparado";

export const PersonalComparado = () => {

  const { GetUsers, userCompared } = useContext(UsersContext);

  const [ navigateTo, setNavigateTo ] = useState(null);

  const [ searchParams, setSearchParams ] = useSearchParams();
  const cedula = searchParams.get("cedula");

  let [ renderCounter, setRenderCounter ] = useState(0);

  useEffect(() => {
    setRenderCounter(renderCounter++);
    if(renderCounter === 1) GetUsers(false, cedula);

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);

  function renderUser() {
    if(userCompared === null) return <p>Sin información</p>;

    const dataUser = userCompared;

    console.log("data user compared: ", dataUser);

    // return;

    return dataUser.map((user, index) => (
      <CardPersonalComparado
        key={index}
        nombre={user.nombre}
        cedula={user.cedula}
        rfc={user.rfc}
        imagenBase64={user.imagenBase64}
      />
    ))
  }

  return (
    <section className="personalComparado">
      {renderUser()}
      {navigateTo}
    </section>
  )
}