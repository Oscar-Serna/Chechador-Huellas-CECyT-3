import { Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";

import { Header } from "./components/Header/Header";
import { Registro } from "./pages/Registro/Registro";
import { PersonalComparado } from "./pages/PersonalComparado/PersonalComparado";
import { UsersContextProvider } from "./context/users.context";

import "./modules/WebSDK";
import { useEffect, useState } from "react";
import { Services_Authentication } from "./services/users.services";

import axios from "axios";

function App() {
  let [renderCounter, setRenderCounter] = useState(0);
  const [ipAddress, setIpAddress] = useState(false);

  useEffect(() => {
    setRenderCounter(renderCounter++);

    if (renderCounter != 1) return;

    if (hasLogged() === true) {
      return setIpAddress(true);
    };

    getIpAddress();
  }, []);

  async function getIpAddress() {
    await axios.get("https://geolocation-db.com/json/").then(({data}) => {
      const ipToTest = data.IPv4;
      const resultIpAuthorized = testIp(ipToTest);

      if (resultIpAuthorized === false) {
        return (window.location.href = "https://cecyt3.ipn.mx/");
      }

      setIpAddress(resultIpAuthorized);

      auth();
    });
  }

  async function auth() {
    await new Promise((res, rej) => {
      const password = prompt(
        "SE DETECTÓ UN DISPOSITIVO NUEVO\nINGRESE LA CONTRASEÑA:"
      );

      if (password === null || password.trim() === "") {
        return (window.location.href = "https://cecyt3.ipn.mx/");
      }

      res(password);
    }).then((password) => {
      async function fetchAuthentication() {
        await Services_Authentication(password).then((resultAuthentication) => {
          if (resultAuthentication === false) {
            return (window.location.href = "https://cecyt3.ipn.mx/");
          }
          if (resultAuthentication === true) {
            saveInLocalStorage();
          }
        });
      }

      fetchAuthentication();
    });
  }

  function testIp(ipToTest) {
    const ipsAuthorized = ["187.191.39.157", "148.204.233.1"];

    if(ipsAuthorized.includes(ipToTest)) return true;

    return false;
  }

  function saveInLocalStorage() {
    if (window.localStorage.getItem("actual_session_huellas_c3") === null) {
      window.localStorage.setItem("actual_session_huellas_c3", "true");
    }
  }

  function hasLogged() {
    if (window.localStorage.getItem("actual_session_huellas_c3") === null)
      return false;

    return true;
  }

  return (
    <>
      {ipAddress === true ? <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Index />
            </>
          }
        />

        <Route
          path="/alta"
          element={
            <>
              <Header />
              <Registro />
            </>
          }
        />

        <Route
          path="/personal"
          element={
            <>
              <Header />
              <UsersContextProvider>
                <PersonalComparado />
              </UsersContextProvider>
            </>
          }
        />
      </Routes> : null }

    </>
  );
}

export default App;
