import React, { useContext, useEffect, useState } from "react";

import "./ModalEditar.css";
import { UsersContext } from "../../context/users.context";

import { IoMdFingerPrint } from "react-icons/io";

import { useSearchParams } from "react-router-dom";

import { numHuellas } from "../../constants/Huellas.js";
import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";

export const ModalEditar = () => {
  const [valueButtonEditar, setValueButtonEditar] = useState("Confirmar");
  const [huellasSelection, setHuellasSelection] = useState(false);

  const [textButtonRegistrar, setTextButtonRegistrar] = useState(
    "REGISTRAR HUELLAS DACTILARES"
  );

  const { GetUsers, allUsers, UpdateUser } = useContext(UsersContext);

  const [searchParams, _] = useSearchParams();

  const index = parseInt(searchParams.get("index"));

  const indexEmpleadoSeleccionado = index;

  // VARIABLES DEL LECTOR DE HUELLAS
  const [reader, setReader] = useState(null);
  const [deviceUID, setDeviceUID] = useState(null);

  const [isReaderCapturing, setIsReaderCapturing] = useState(false);

  let [scanIndex, setScanIndex] = useState(0);

  const [arrayHuellas, setArrayHuellas] = useState(
    new Array(numHuellas).fill(false)
  );

  // FUNCIONES DEL LECTOR DE HUELLAS
  function StartCapturaHuellas() {
    if (isReaderCapturing === true) return;
    const samplesHuellas = JSON.parse(localStorage.getItem("editarHuellas"));

    reader
      .startAcquisition(SampleFormat.PngImage, `${deviceUID}`)
      .then((result) => {
        setIsReaderCapturing(true);
        if (samplesHuellas === null)
          return setTextButtonRegistrar("REGISTRANDO HUELLAS...");

        if(samplesHuellas.length < numHuellas)
          return setTextButtonRegistrar("REGISTRANDO HUELLAS...");

        if (samplesHuellas.length === numHuellas){
          setArrayHuellas(new Array(numHuellas).fill(true));
          return setTextButtonRegistrar("HUELLAS YA OBTENIDAS... (REINICIE HUELLAS)");
        }

        if (samplesHuellas.length > numHuellas) DeleteLocalStorage();
      })
      .catch((error) => {
        console.error("ERROR EN LA CAPTURA DE HUELLAS", error);
      });

  }
  function StopCapturaHuellas() {
    if (isReaderCapturing === false) return;

    reader.stopAcquisition(deviceUID);
    setIsReaderCapturing(false);
    setTextButtonRegistrar("¡ADQUISICIÓN DE HUELLAS TERMINADA!");

    setTimeout(() => {
      setTextButtonRegistrar("REGISTRAR HUELLAS DACTILARES");
    }, 2000);
  }
  function SaveSamplesInLocalStorage(sampleImage) {
    const samplesHuellas = localStorage.getItem("editarHuellas");

    if (samplesHuellas === null) {
      const huellas = [];
      const newHuellasArray = [...huellas, sampleImage];
      localStorage.setItem("editarHuellas", JSON.stringify(newHuellasArray));
    } else {
      const huellas = JSON.parse(localStorage.getItem("editarHuellas"));
      const newHuellasArray = [...huellas, sampleImage];
      localStorage.setItem("editarHuellas", JSON.stringify(newHuellasArray));
    }
  }
  function FixSampleImage(base64Image) {
    let fixedImage = base64Image;
    fixedImage = fixedImage.replace(/_/g, "/");
    fixedImage = fixedImage.replace(/-/g, "+");

    return fixedImage;
  }
  function DeleteLocalStorage() {
    localStorage.removeItem("editarHuellas");
  }
  // EVENTS FUNCTIONS DEL LECTOR
  function OnDeviceConnected() {
    console.log("EL LECTOR ESTA CONECTADO");
  }
  function OnDeviceDisconnected() {
    console.log("EL LECTOR ESTA DESCONECTADO");
  }
  function OnAcquisitonStarted() {
    console.log("SE EMPIEZAN A OBTENER LAS MUESTRAS DE HUELLAS DACTILARES");
  }
  function OnAcquisitonStopped() {
    console.log("SE DEJAN DE OBTENER LAS MUESTRAS DE HUELLAS DACTILARES");
  }
  function OnSamplesAcquired(event) {
    console.log(arrayHuellas);

    if (scanIndex > arrayHuellas.length - 1) return;

    const sampleImage = event.samples[0];

    SaveSamplesInLocalStorage(FixSampleImage(sampleImage));

    const newArrayHuellas = [...arrayHuellas];

    for (let i = 0; i <= scanIndex; i++) {
      newArrayHuellas[i] = true;
    }

    setScanIndex(scanIndex++);
    setArrayHuellas(newArrayHuellas);
  }
  // USE EFFECTS DEL LECTOR DE HUELLAS
  useEffect(() => {
    setReader(new FingerprintReader());
  }, []);
  useEffect(() => {
    if (reader === null) return;

    reader.on("DeviceConnected", OnDeviceConnected);
    reader.on("DeviceDisconnected", OnDeviceDisconnected);
    reader.on("AcquisitionStarted", OnAcquisitonStarted);
    reader.on("AcquisitionStopped", OnAcquisitonStopped);
    reader.on("SamplesAcquired", OnSamplesAcquired);

    Promise.all([reader.enumerateDevices()]).then((result) => {
      setDeviceUID(result[0][0]);
    });
  }, [reader]);
  // FUNCIONES COMUNES DEL DOCUMENTO

  function GoToInicio() {
    window.location.href = "/";
    DeleteLocalStorage();
  }

  function GoToAlta() {
    window.location.href = "/#/alta";
    DeleteLocalStorage();
  }

  function renderFormulario() {
    if (allUsers[0] === null) return;

    if (allUsers.length === 0) return;

    const infoEmpleado = allUsers[indexEmpleadoSeleccionado];

    if (infoEmpleado === undefined) return GoToInicio();

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

  function handleUpdate() {
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

    if (huellasSelection === true) {
      const samplesHuellas = JSON.parse(localStorage.getItem("editarHuellas"));

      if (samplesHuellas === null)
        return alert("DEBES DE REGISTRAR TODAS LAS HUELLAS");

      console.log(samplesHuellas.length, numHuellas);

      if (samplesHuellas.length < numHuellas)
        return alert("DEBES REGISTRAR TODAS LAS HUELLAS");
    }

    if (cedulaOriginal === null) return alert("CEDULA ORIGINAL NO ASIGNADA");

    console.log({ cedulaOriginal, cedula });

    setValueButtonEditar("Modificando, espere...");

    const huellasModificadas = JSON.parse(
      localStorage.getItem("editarHuellas")
    );

    const seModificanHuellas = huellasSelection;

    async function ObtenerResultadoUpdate() {
      await UpdateUser(
        nombre,
        cedula,
        cedulaOriginal,
        rfc,
        puesto,
        turno,
        seModificanHuellas,
        huellasModificadas
      ).then((result) => {
        if (result === "MODIFICADO") {
          GoToAlta();
        }
        console.log(result);
      });
    }

    ObtenerResultadoUpdate();
  }

  function handleReiniciarHuellas() {
    window.location.reload();
  }

  useEffect(() => {
    GetUsers(true, null);
  }, []);

  return (
    <section
      className={`modalEditar activo`}
      onClick={(e) => {
        if (e.target.classList.contains("modalEditar")) {
          limpiarFormulario();
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
          <div className="buttonsScanSamples">
            <input
              type="button"
              value={textButtonRegistrar}
              style={{
                backgroundColor: "rgb(1, 80, 170)",
              }}
              onClick={() => {
                StartCapturaHuellas();
              }}
            />
            <input
              type="button"
              value="TERMINAR ESCANEO"
              style={{
                backgroundColor: "darkred",
              }}
              onClick={() => {
                StopCapturaHuellas();
              }}
            />
          </div>

          <h4>MODIFICAR HUELLAS DACTILARES</h4>

          <div className="imagenesHuellasModificar">
            {arrayHuellas.map((huella, index) =>
              huella === false ||
              JSON.parse(localStorage.getItem("editarHuellas")) === null ? (
                <div key={index}>
                  <IoMdFingerPrint />
                  <p>Huella {index + 1}</p>
                </div>
              ) : (
                <div key={index}>
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${
                      JSON.parse(localStorage.getItem("editarHuellas"))[index]
                    }`}
                    alt="Imagen de huella dactilar"
                  />
                  <p>Huella {index + 1}</p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="botones">
          <input
            type="button"
            className="Reiniciar"
            value="Reiniciar huellas"
            onClick={() => {
              handleReiniciarHuellas();
              DeleteLocalStorage();
            }}
          />
          <input
            type="button"
            className="cancelar"
            value="Cancelar"
            onClick={() => {
              limpiarFormulario();
              GoToAlta();
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
