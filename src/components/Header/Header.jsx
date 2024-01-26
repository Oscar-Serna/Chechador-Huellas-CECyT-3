import React, { useEffect, useState } from "react";

import "./Header.css";

import logoC3 from "../../img/logoC3.png";

export const Header = () => {
  const [reloj, setReloj] = useState(0);
  let [renderCounter, setRenderCounter] = useState(0);

  const nombreDias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const nombreMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  useEffect(() => {
    setRenderCounter(renderCounter++);

    if (renderCounter === 1) {
      getFecha();
      setInterval(() => {
        getFecha();
      }, 100000);
    }
  }, []);

  function getFecha() {
    const date = new Date();

    const fechas = {
      diaSemana: date.getDay(),
      diaMes: date.getDate(),
      mes: date.getMonth(),
      año: date.getFullYear(),
    };

    setReloj(
      `${nombreDias[fechas.diaSemana]} ${fechas.diaMes} de ${nombreMeses[fechas.mes]} del ${fechas.año}`
    );
  }

  return (
    <header>
      <section className="sectionLogo">
        <img src={logoC3} alt="" />
        <a href="/">
          <h1>Reloj Checador</h1>
        </a>
      </section>
      <section className="sectionReloj">
        <p>
          <b>{reloj}</b>
        </p>
      </section>
    </header>
  );
};
