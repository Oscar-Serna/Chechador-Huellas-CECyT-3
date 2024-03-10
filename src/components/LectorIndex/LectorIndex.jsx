import React, { useState, useEffect, useContext } from "react";

import { Navigate } from "react-router-dom";

import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";

import "../../modules/WebSDK";

import { GiFingerPrint } from "react-icons/gi";
import { TbHandFinger } from "react-icons/tb";

import "./LectorIndex.css";

import { CompareContext } from "../../context/compare.context";

import loadingGIF from "../../img/loadingGIF.gif";

export const LectorIndex = () => {

  const { CompareUser, resultCompare, setResultCompare, compareCedula } =
    useContext(CompareContext);

  const [fetchState, setFetchState] = useState(false);

  const [reader, setReader] = useState(null);
  const [readerState, setReaderState] = useState(false);
  const [scanningState, setScanningState] = useState("No esta listo");

  const [prevImage, setPrevImage] = useState(null);

  const [navigateTo, setNavigateTo] = useState(null);

  const [ modalLoadingState, setModalLoadingState ] = useState("inactive");

  const [ comparisionMessage, setComparisionMessage ] = useState(<h3 style={{color: "rgb(1, 80, 170)"}}>Comparando huella dactilar...</h3>);

  const [ comparisionResult, setComparisionResult ] = useState("");

  const [ deviceUID, setDeviceUID ] = useState(null);

  useEffect(() => {

    async function getDeviceUID (){

      await new FingerprintReader().enumerateDevices()
      .then(result => {
        setDeviceUID(result);
      })
      .finally(_ => {
        setReader(new FingerprintReader());
      })
      .catch(error => {
        console.log("Error al obtener el UID Device", error);
      })

    }

    getDeviceUID();

  }, []);

  useEffect(() => {
    if (reader != null) {
      reader.on("DeviceConnected", onDeviceConnected);
      reader.on("DeviceDisconnected", onDeviceDisconnected);
      reader.on("AcquisitionStarted", onAcquisitionStarted);
      reader.on("AcquisitionStopped", onAcquisitionStopped);
      reader.on("SamplesAcquired", onSamplesAcquired);

      Promise.all([reader.enumerateDevices()]).then((_) => {
        startCaptura();
      });
    }
  }, [reader]);

  function onDeviceConnected() {
    setReaderState(true);
  }

  function onDeviceDisconnected() {
    setReaderState(false);
  }

  function onAcquisitionStarted() {}

  function onAcquisitionStopped() {
    onAcquisitionStarted();
  }

  function onSamplesAcquired(e) {

    if (fetchState === true) {
      console.log("SE INTENTA HACER PETICION CUANDO ESTA ESCANEANDO...");
      return;
    };

    if (fetchState === false) {
      setFetchState(true);
      setModalLoadingState("active");
    }

    setResultCompare(null);

    setScanningState(
      <span style={{ color: "green" }}>Se escaneó con éxito</span>
    );

    const fingerprintFixed = fixFingerprintImage(e.samples[0]);

    CompareUser(fingerprintFixed);

    setTimeout(() => {
      setScanningState("Listo para escanear...");
      setPrevImage(null);
    }, 1750);
    setPrevImage(fixFingerprintImage(e.samples[0]));
  }

  useEffect(() => {
    if (resultCompare === true) {
      // setNavigateTo(<Navigate to={`/personal/?cedula=${compareCedula}`} />);
      window.location.href = `https://148.204.233.1/capital/ingreso.php?cedula=${compareCedula}`
      setResultCompare(null);
      setFetchState(false);
      setModalLoadingState("inactive");
    } else if (resultCompare === false) {
      setResultCompare(null);
      setFetchState(false);
      setComparisionResult("incorrect")
      setComparisionMessage(<h3 style={{ color: "darkred" }}>Vuelva a intentarlo...</h3>);
      setTimeout(() => {
        setModalLoadingState("inactive");
        setComparisionMessage(<h3 style={{color: "rgb(1, 80, 170)"}}>Comparando huella dactilar</h3>);
        setComparisionResult("");
      }, 750);
    }
  }, [resultCompare]);

  function fixFingerprintImage(textImage) {
    let formatImage = textImage;
    formatImage = formatImage.replace(/_/g, "/");
    formatImage = formatImage.replace(/-/g, "+");

    return formatImage;
  }

  function startCaptura() {
    reader
      .startAcquisition(
        SampleFormat.PngImage,
        `${deviceUID}`
      )
      .then((_) => {
        setScanningState("Listo para escanear...");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <section className="seccionLectorIndex">
        <div className="state">
          <div>
            <GiFingerPrint />
          </div>
          <p>{scanningState}</p>
        </div>
        <div className="preview">
          <div>
            {prevImage === null ? (
              <TbHandFinger />
            ) : (
              <img
                src={`data:image/jpeg;base64,${prevImage}`}
                alt="Previsualización de huella dactilar del cliente..."
              />
            )}
          </div>
          <p>Verifica que la huella se vea bien marcada</p>
        </div>
        <p className="readerState">
          {readerState ? (
            <span style={{ color: "green" }}>
              El lector de huellas fue encontrado y funcionando...
            </span>
          ) : (
            <span style={{ color: "red" }}>
              ¡¡ Lector de huellas no encontrado !! <br /> ( Verifique que esté
              conectado correctamente )
            </span>
          )}
        </p>
        {navigateTo}
      </section>
      <section className={`modalLoading ${modalLoadingState} ${comparisionResult}`}>
        <article className="contentModalLoading">
          { comparisionMessage }
          <img src={loadingGIF} alt="GIF en referencia a la comparación de huellas dactilares" />
        </article>
      </section>
    </>
  );
};
