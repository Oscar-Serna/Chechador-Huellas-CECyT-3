import React, { createContext, useState } from "react";
import { Services_CompareFingerprint } from "../services/compare.services";

export const CompareContext = createContext();

export const CompareContextProvider = ({ children }) => {
  const [resultCompare, setResultCompare] = useState(null);
  const [compareCedula, setCompareCedula] = useState(null);

  function CompareUser(fingerprint) {
    const fetchCompare = async () => {

      const { result, cedula } = await Services_CompareFingerprint(fingerprint);

      setCompareCedula(cedula);
      setResultCompare(result);

    };

    fetchCompare();
  }

  return (
    <CompareContext.Provider
      value={{
        CompareUser,
        setResultCompare,
        compareCedula,
        resultCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
