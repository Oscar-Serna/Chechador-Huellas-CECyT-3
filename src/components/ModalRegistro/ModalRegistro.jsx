import React, { useState, useEffect, useContext } from "react";

import { IoMdFingerPrint } from "react-icons/io";

import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";

import "../../modules/WebSDK";

import "./ModalRegistro.css";

import { UsersContext } from "../../context/users.context";

export const ModalRegistro = ({ modalState, animationRegistro }) => {
  const numeroHuellas = 12;

  const [huellas, setHuellas] = useState(new Array(numeroHuellas).fill(false));
  const [reader, setReader] = useState(null);

  // ESTADO DE LECTURA
  const [readerState, setReaderState] = useState(false);

  // ESTADO DE ENCENDIDO - PRENDIDO / APAGADO
  const [readerStatus, setReaderStatus] = useState(false);
  const [scanningState, setScanningState] = useState(
    "Registrar huellas dactilares"
  );
  const [deviceUID, setDeviceUID] = useState(null);
  let [scanCounter, setScanCounter] = useState(0);

  // CONTEXTO
  const { GetUsers, CreateUser } = useContext(UsersContext);

  // INICIALIZAMOS "reader" PARA DEFINIR EL OBJETO "FingerprintReader"
  useEffect(() => {
    setReader(new FingerprintReader());

    window.addEventListener("load", hasFingerprintsSaved);

    window.removeEventListener("DOMContentLoaded", hasFingerprintsSaved);
  }, []);

  // INICIALIZAMOS LA ESCUCHA DE EVENTOS DEL LECTOR Y OBTENEMOS SU "UID" (CUANDO SE MODIFIQUE EL "reader")
  useEffect(() => {
    if (reader != null) {
      reader.on("DeviceConnected", onDeviceConnected);
      reader.on("DeviceDisconnected", onDeviceDisconnected);
      reader.on("AcquisitionStarted", onAcquisitionStarted);
      reader.on("AcquisitionStopped", onAcquisitionStopped);
      reader.on("SamplesAcquired", onSamplesAcquired);

      Promise.all([reader.enumerateDevices()]).then((response) => {
        setDeviceUID(response[0][0]);
      });
    }
  }, [reader]);

  // ESTADO DE CONEXIÓN
  function onDeviceConnected() {
    setReaderStatus(true);
  }

  function onDeviceDisconnected() {
    setReaderStatus(false);
  }

  // PREGUNTAR SI YA EXISTEN HUELLAS REGISTRADAS
  function hasFingerprintsSaved() {
    const huellasLS = JSON.parse(localStorage.getItem("huellas"));

    if (huellasLS === null) return console.log("No existen huellas");

    setHuellas(() => {
      const newHuellas = new Array(numeroHuellas).fill(false);

      for (let i = 0; i < newHuellas.length; i++) {
        if (huellasLS[i] != undefined) newHuellas[i] = true;
        else newHuellas[i] = false;
      }

      return newHuellas;
    });
  }

  // INICIO DE ADQUISICIÓN DE IMAGENES
  function onAcquisitionStarted() {
    if (scanningState === true) return;

    setScanningState("Capturando huellas...");

    const huellasLS = JSON.parse(localStorage.getItem("huellas"));

    if (huellasLS != null) {
      const huellasComplete = new Array(numeroHuellas).fill(true);

      if (huellasLS != null && huellasLS.length >= huellas.length) {
        setHuellas(huellasComplete);
        reader.stopAcquisition(deviceUID);

        setScanningState("Huellas ya obtenidas... (Reinicie valores)");
      }
    }
  }

  function startCaptura() {
    if (readerState === true) return;

    reader
      .startAcquisition(
        SampleFormat.PngImage,
        "44CB0200-2776-8548-94FE-F89DDB7A0BB4"
      )
      .then((_) => {
        setReaderState(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // FIN DE ADQUISICION DE IMAGENES
  function onAcquisitionStopped() {
    setTimeout(() => {
      setScanningState("Registrar huellas dactilares");
      setReaderState(false);
    }, 2000);
  }

  function stopCaptura() {
    if (readerState === true) {
      reader.stopAcquisition(deviceUID);
      setReaderState(false);

      setScanningState("Adquisición de huellas terminada...");
    }
  }

  // CUANDO SE OBTIENE UNA IMAGEN DEL LECTOR
  function onSamplesAcquired(e) {
    if (scanCounter > huellas.length - 1) return;

    saveLocalStorage(fixFingerprintImage(e.samples[0]));

    const newHuellas = [...huellas];

    for (let i = 0; i <= scanCounter; i++) {
      newHuellas[i] = true;
    }

    setScanCounter(scanCounter++);
    setHuellas(newHuellas);
  }

  // GUARDAR IMAGENES EN EL LS
  // RAZÓN: (NO SE PUEDE GUARDAR EN REACT POR EL TAMAÑO DE LA IMAGEN) 250KB+ c/u
  function saveLocalStorage(textImage) {
    const huellasLS = JSON.parse(localStorage.getItem("huellas"));

    if (huellasLS != null && huellasLS.length >= huellas.length) {
      return alert("Maximo de huellas registrado localmente");
    }

    if (localStorage.getItem("huellas") === null) {
      const huellas = [];
      const newHuellas = [...huellas, textImage];
      localStorage.setItem("huellas", JSON.stringify(newHuellas));
    } else {
      const huellas = JSON.parse(localStorage.getItem("huellas"));
      const newHuellas = [...huellas, textImage];
      localStorage.setItem("huellas", JSON.stringify(newHuellas));
    }
  }

  // ELIMINAR LOCALSTORAGE
  function deleteLocalStorage() {
    localStorage.removeItem("huellas");
    window.location.reload();
  }

  // CORREGIR EL FORMATO DE LA IMAGEN
  // RAZÓN: (CUANDO )
  function fixFingerprintImage(textImage) {
    let formatImage = textImage;
    formatImage = formatImage.replace(/_/g, "/");
    formatImage = formatImage.replace(/-/g, "+");

    return formatImage;
  }

  // SE LIMPIAN LOS VALORES DEL AGREGADO DE PERSONAL
  function limpiarValoresRegistro() {
    const inputs = document.querySelectorAll(".inputs > input");

    inputs.forEach((input) => (input.value = ""));
    deleteLocalStorage();
  }

  function handleCreateUser() {
    const inputsModal = document.querySelectorAll(".inputs > input");

    const valueInputs = new Array(5).fill(null);

    inputsModal.forEach((input, index) => {
      if (input.value.trim() === "")
        return alert(
          `Debes llenar el campo:\n${input.placeholder.toUpperCase()}`
        );

      valueInputs[index] = (input.value);

      if (valueInputs[index] === null) return alert(`Ocurrio un error el input No. ${index + 1} es null`);
    });

    const huellasLS = JSON.parse(localStorage.getItem("huellas"));

    if(huellasLS === null) return alert("No hay huellas registradas");

    huellas.forEach((huella, index) => {
      if(huella === false) return alert(`La huella número ${index + 1} del personal no se registro correctamente`);
    })

    console.log(huellasLS);

    CreateUser(
      valueInputs[0],
      valueInputs[1].trim(),
      valueInputs[2].trim(),
      valueInputs[3],
      valueInputs[4],
      huellasLS
    );
  }

  return (
    <section
      className={`modalRegistro ${modalState}`}
      onClick={(e) => {
        if (e.target.classList.contains("modalRegistro")) {
          animationRegistro();
          stopCaptura();
        }
      }}
    >
      <article>
        <h3>Agregar Personal</h3>
        <div className="inputs">
          <input type="text" placeholder="Nombre completo" />
          <input type="text" placeholder="Cédula" />
          <input type="text" placeholder="RFC" />
          <input type="text" placeholder="Puesto laboral" />
          <input type="text" placeholder="Turno" />
        </div>
        <div className="fingerprints">
          <div>
            <input
              type="button"
              value={scanningState}
              onClick={() => {
                startCaptura();
              }}
            />
            <input
              type="button"
              value={"Terminar escaneo"}
              className="terminar"
              onClick={() => {
                stopCaptura();
              }}
            />
          </div>
          <ul className="listFingerprints">
            {huellas.map((huella, index) => (
              <li className="finger" key={index}>
                {huella === false ? (
                  <IoMdFingerPrint />
                ) : (
                  <img
                    src={`data:image/jpeg;base64,${
                      JSON.parse(localStorage.getItem("huellas"))[index]
                    }`}
                    alt="Huella digital del personal"
                  />
                )}
                <p>Huella {index + 1}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <input
            type="button"
            value="Limpiar valores"
            className="reiniciar"
            onClick={() => {
              limpiarValoresRegistro();
            }}
          />
          <input
            type="button"
            value="Cancelar"
            className="cancelar"
            onClick={() => {
              animationRegistro();
              stopCaptura();
            }}
          />
          <input
            type="button"
            value="Terminar"
            onClick={() => {
              handleCreateUser();
            }}
          />
        </div>
      </article>
    </section>
  );
};
