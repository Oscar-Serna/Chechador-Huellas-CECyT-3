import React, { createContext, useState } from "react";

export const EditarContext = createContext();

export const EditarContextProvider = ({ children }) => {
  const [modalState, setModalState] = useState("inactivo");

  const [indexEmpleadoSeleccionado, setIndexEmpleadoSeleccionado] = useState(null);

  return (
    <EditarContext.Provider
      value={{
        // VALUES
        modalState,
        indexEmpleadoSeleccionado,
        // FUNCTIONS
        setModalState,
        setIndexEmpleadoSeleccionado,
      }}
    >
      {children}
    </EditarContext.Provider>
  );
};
