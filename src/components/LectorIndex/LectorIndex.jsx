import React, { useState, useEffect } from "react";

import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";

import "../../modules/WebSDK";

import { GiFingerPrint } from "react-icons/gi";
import { TbHandFinger } from "react-icons/tb";

import "./LectorIndex.css";
import { Services_CompareFingerprint } from "../../services/compare.services";

export const LectorIndex = () => {
  const [reader, setReader] = useState(null);
  const [readerState, setReaderState] = useState(false);
  const [scanningState, setScanningState] = useState("No esta listo");

  const [prevImage, setPrevImage] = useState(null);

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

      Promise.all([reader.enumerateDevices()]).then((results) => {
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
    setScanningState(
      <span style={{ color: "green" }}>Se escaneó con éxito</span>
    );

    Services_CompareFingerprint(
      fixFingerprintImage(e.samples[0])
      );

    setTimeout(() => {
      setScanningState("Listo para escanear...");
      setPrevImage(null);
    }, 1750);
    setPrevImage(fixFingerprintImage(e.samples[0]));
  }

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
      .then((response) => {
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
    </section>
  );
};
