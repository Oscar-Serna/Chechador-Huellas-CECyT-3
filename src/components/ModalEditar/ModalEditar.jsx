import React, { useContext, useEffect, useState } from "react";

import "./ModalEditar.css";
import { EditarContext } from "../../context/editar.context";
import { UsersContext } from "../../context/users.context";

import { IoMdFingerPrint } from "react-icons/io";

export const ModalEditar = () => {
  const [valueButtonEditar, setValueButtonEditar] = useState("Confirmar");
  const [huellasSelection, setHuellasSelection] = useState(false);

  const numHuellas = 4;

  const huellasArray = new Array(numHuellas).fill(null);

  const { modalState, setModalState, indexEmpleadoSeleccionado } =
    useContext(EditarContext);

  const { allUsers, UpdateUser } = useContext(UsersContext);

  function renderFormulario() {
    if (allUsers.length === 0) return;

    const infoEmpleado = allUsers[indexEmpleadoSeleccionado];

    return (
      <div className="formulario">
        <div>
          <input type="text" placeholder="NOMBRE COMPLETO" />
          <p
            onClick={() => {
              insertarValor(0, infoEmpleado.nombre);
            }}
            title="Asignar valor"
          >
            Anterior: <span>{infoEmpleado.nombre}</span>
          </p>
        </div>
        <div>
          <input type="text" placeholder="CÉDULA" />
          <p
            onClick={() => {
              insertarValor(1, infoEmpleado.cedula);
            }}
          >
            Anterior: <span>{infoEmpleado.cedula}</span>
          </p>
        </div>
        <div>
          <input type="text" placeholder="RFC" />
          <p
            onClick={() => {
              insertarValor(2, infoEmpleado.rfc);
            }}
          >
            Anterior: <span>{infoEmpleado.rfc}</span>
          </p>
        </div>
        <div>
          <input type="text" placeholder="PUESTO LABORAL" />
          <p
            onClick={() => {
              insertarValor(3, infoEmpleado.puesto);
            }}
          >
            Anterior: <span> {infoEmpleado.puesto} </span>
          </p>
        </div>
        <div>
          <input type="text" placeholder="TURNO" />
          <p
            onClick={() => {
              insertarValor(4, infoEmpleado.turno);
            }}
          >
            Anterior: <span>{infoEmpleado.turno}</span>
          </p>
        </div>
        <div style={{ gap: "1rem", textAlign: "center" }}>
          <h4 style={{ color: "rgb(1, 80, 170)" }}>¿MODIFICAR HUELLAS?</h4>
          <div className="buttonsModificarHuellas">
            <input
              type="button"
              className={huellasSelection ? "selected" : ""}
              value="Si"
              onClick={(e) => {
                HuellasSelection(0, true);
              }}
            />
            <input
              type="button"
              className={huellasSelection ? "" : "selected"}
              value="No"
              onClick={(e) => {
                HuellasSelection(1, false);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  function limpiarFormulario() {
    const inputs = document.querySelectorAll(".formulario > div > input");

    inputs.forEach((input) => {
      input.value = "";
    });
  }

  function insertarValor(index, value) {
    const input = document.querySelectorAll(".formulario > div > input")[index];

    input.value = value;
  }

  function handleUpdate() {
    setValueButtonEditar("Modificando, espere...");

    const inputsFormulario = document.querySelectorAll(
      ".formulario > div > input"
    );

    const nombre = inputsFormulario[0].value.toUpperCase();
    const cedula = inputsFormulario[1].value.toUpperCase();
    const rfc = inputsFormulario[2].value.toUpperCase();
    const puesto = inputsFormulario[3].value.toUpperCase();
    const turno = inputsFormulario[4].value.toUpperCase();

    if (indexEmpleadoSeleccionado === null)
      return alert("DEBES DE ESCOGER A UN MIEMBRO PARA EDITARLO");

    const cedulaOriginal = allUsers[indexEmpleadoSeleccionado].cedula;

    console.log({ nombre, cedula, rfc, puesto, turno });

    if (
      nombre.trim() === "" ||
      cedula.trim() === "" ||
      rfc.trim() === "" ||
      puesto.trim() === "" ||
      turno.trim() === ""
    ) {
      setValueButtonEditar("CONFIRMAR");
      return alert("DEBES DE RELLENAR TODOS LOS CAMPOS");
    }

    if (cedulaOriginal === null) return alert("CEDULA ORIGINAL NO ASIGNADA");

    async function ObtenerResultadoUpdate() {
      await UpdateUser(nombre, cedula, cedulaOriginal, rfc, puesto, turno).then(
        (result) => {
          if (result === "MODIFICADO") {
            limpiarFormulario();
            setModalState("inactivo");
            setValueButtonEditar("CONFIRMAR");
          }
        }
      );
    }

    ObtenerResultadoUpdate();
  }

  function HuellasSelection(index, selection) {
    const buttonsSelection = document.querySelectorAll(
      ".buttonsModificarHuellas > input"
    );

    buttonsSelection.forEach((button) => {
      button.classList.remove("selected");
    });

    buttonsSelection[index].classList.add("selected");

    setHuellasSelection(selection);
  }

  useEffect(() => {
    if (huellasSelection != true) return;
  }, [huellasSelection]);

  return (
    <section
      className={`modalEditar ${modalState}`}
      onClick={(e) => {
        if (e.target.classList.contains("modalEditar")) {
          limpiarFormulario();
          setModalState("inactivo");
          setHuellasSelection(false);
        }
      }}
    >
      <article>
        <div className="titulo">
          <h3>EDITAR PERSONAL</h3>
        </div>

        {indexEmpleadoSeleccionado === null ? null : renderFormulario()}

        <div className={`huellasModificar ${huellasSelection}`}>
          <h4>AGREGAR HUELLAS</h4>

          <div className="imagenesHuellasModificar">
            {huellasArray.map((huella, index) =>
                huella === null ? (
                <div key={index}>
                  <IoMdFingerPrint />
                  <p>Huella {index + 1}</p>
                </div>
              ) : (
                <div>
                  <img key={index} src={JSON.parse(localStorage.getItem("huellasModificar"))[index]} alt="" />
                  <p>Huella {index + 1}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="botones">
          <input
            type="button"
            className="cancelar"
            value="Cancelar"
            onClick={() => {
              limpiarFormulario();
              setModalState("inactivo");
              setHuellasSelection(false);
            }}
          />
          <input
            type="button"
            className="editar"
            value={valueButtonEditar}
            onClick={() => {
              handleUpdate();
            }}
          />
        </div>
      </article>
    </section>
  );
};
