import { Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";

import { Header } from "./components/Header/Header";
import { Registro } from "./pages/Registro/Registro";
import { PersonalComparado } from "./pages/PersonalComparado/PersonalComparado";
import { UsersContextProvider } from "./context/users.context";

import "./modules/WebSDK";
import { useEffect, useState } from "react";
import { Services_Authentication } from "./services/users.services";

function App() {

  let [renderCounter, setRenderCounter] = useState(0);

  useEffect(() => {

    setRenderCounter(renderCounter++);

    if(renderCounter != 1) return;

    if(hasLogged() === true) return;


    async function auth() {
      await new Promise((res, rej) => {
        const password = prompt("SE DETECTÓ UN DISPOSITIVO NUEVO\nINGRESE LA CONTRASEÑA:");

        if (password === null || password.trim() === "") {
          return (window.location.href = "https://cecyt3.ipn.mx/");
        }

        res(password);
      }).then((password) => {
        async function fetchAuthentication() {
          await Services_Authentication(password).then(
            (resultAuthentication) => {
              if (resultAuthentication === false) {
                return window.location.href = "https://cecyt3.ipn.mx/";
              }
              if(resultAuthentication === true){
                saveInLocalStorage();
              }
            }
          );
        }

        fetchAuthentication();
      });
    }

    auth();
  }, []);

  function saveInLocalStorage(){

    if(window.localStorage.getItem("actual_session_huellas_c3") === null){
      window.localStorage.setItem("actual_session_huellas_c3", "true");
    }

  }

  function hasLogged(){

    if(window.localStorage.getItem("actual_session_huellas_c3") === null) return false;

    return true;

  }

  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
