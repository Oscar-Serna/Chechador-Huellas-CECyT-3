import React, { useState, useEffect } from "react";

import "./RelojIndex.css";

import { Link } from "react-router-dom";

export const RelojIndex = () => {
  let [renderCounter, setRenderCounter] = useState(0);
  const [reloj, setReloj] = useState(0);

  useEffect(() => {
    setRenderCounter(renderCounter++);

    if (renderCounter === 1) {
      getReloj();
      setInterval(() => {
        getReloj();
      }, 1000);
    }
  }, []);

  function getReloj() {
    const date = new Date();
    let hora =
      date.getHours() > 12
        ? `0${date.getHours() - 12}`
        : date.getHours();
    const minutos =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const segundos =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    if (hora === 0) hora += 12;

    setReloj(`${hora}:${minutos}:${segundos}`);
  }

  function getHoraryTime() {
    return new Date().getHours() <= 12 ? "a.m" : "p.m";
  }

  function getHorary() {
    const hour = new Date().getHours();

    if (hour < 12 && hour >= 6) return "Buenos días";
    else if (hour < 18 && hour >= 12) return "Buenas tardes";
    else return "Buenas noches";
  }

  return (
    <section className="seccionReloj">
      <div className="reloj">
        <h2>
          {reloj} <span>{getHoraryTime()}</span>
        </h2>
      </div>
      <div className="horary">
        <h4>¡{getHorary()}!</h4>
      </div>
      <div className="buttons">
        <Link to={"/registro"}>
          <input type="button" value="Soy nuevo, regístrame" />
        </Link>
      </div>
    </section>
  );
};
