import React, { useEffect, useState } from "react";

import "./Header.css";

import logoC3 from "../../img/logoC3.png";
import { Link } from "react-router-dom";

export const Header = () => {
  const [reloj, setReloj] = useState(0);
  let [renderCounter, setRenderCounter] = useState(0);

  useEffect(() => {
    setRenderCounter(renderCounter++);

    if(renderCounter === 1) {
      getFecha();
      setInterval(() => {
        getFecha()
      }, 100000);
    }

  }, []);

  function getFecha () {
    const date = new Date();

    const fechas = {
      diaSemana: date.getDay(),
      diaMes: date.getDate(),
      mes: date.getMonth(),
      año: date.getFullYear(),
    }


    setReloj(`${getDia(fechas.diaSemana)} ${fechas.diaMes} de ${getMes(fechas.mes)} del ${fechas.año}`)

  }

  function getDia(dia) {
    switch(dia) {
      case 0: return "Domingo";
      case 1: return "Lunes";
      case 2: return "Martes";
      case 3: return "Miércoles";
      case 4: return "Jueves";
      case 5: return "Viernes";
      case 6: return "Sábado";
    }
  }

  function getMes(mes) {
    switch(mes) {
      case 0: return "Enero";
      case 1: return "Febrero";
      case 2: return "Marzo";
      case 3: return "Abril";
      case 4: return "Mayo";
      case 5: return "Junio";
      case 6: return "Julio";
      case 7: return "Agosto";
      case 8: return "Septiembre";
      case 9: return "Octubre";
      case 10: return "Noviembre";
      case 11: return "Diciembre";
    }
  }

  return (
    <header>
      {/* <Link> */}
      <section className="sectionLogo">
        <img src={logoC3} alt="" />
        <Link to={"/"}>
        <h1>Reloj Checador</h1>
        </Link>
      </section>
      {/* </Link> */}
      <section className="sectionReloj">
        <p><b>{reloj}</b></p>
      </section>
    </header>
  )


}