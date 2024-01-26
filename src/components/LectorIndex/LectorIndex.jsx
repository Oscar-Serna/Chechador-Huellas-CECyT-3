import React, { useState, useEffect, useContext } from "react";

import { Navigate } from "react-router-dom";

import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";

import "../../modules/WebSDK";

import { GiFingerPrint } from "react-icons/gi";
import { TbHandFinger } from "react-icons/tb";

import "./LectorIndex.css";

import { CompareContext } from "../../context/compare.context";

export const LectorIndex = () => {
  const { CompareUser, resultCompare, setResultCompare, compareCedula } = useContext(CompareContext);

  const [reader, setReader] = useState(null);
  const [readerState, setReaderState] = useState(false);
  const [scanningState, setScanningState] = useState("No esta listo");

  const [prevImage, setPrevImage] = useState(null);

  const [ navigateTo, setNavigateTo ] = useState(null);

  useEffect(() => {
    setReader(new FingerprintReader());
  }, []);

  useEffect(() => {
    if (reader != null) {
      reader.on("DeviceConnected", onDeviceConnected);
      reader.on("DeviceDisconnected", onDeviceDisconnected);
      reader.on("AcquisitionStarted", onAcquisitionStarted);
      reader.on("AcquisitionStopped", onAcquisitionStopped);
      reader.on("SamplesAcquired", onSamplesAcquired);

      Promise.all([reader.enumerateDevices()]).then(_ => {
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
    if(resultCompare === true){
      setNavigateTo(<Navigate to={`/personal/?cedula=${compareCedula}`}/>);
    }else if(resultCompare === false) {
      alert("LA HUELLA NO COINCIDE\nVuelva a intentarlo...");
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
        "44CB0200-2776-8548-94FE-F89DDB7A0BB4"
      )
      .then(_ => {
        setScanningState("Listo para escanear...");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
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
  );
};
