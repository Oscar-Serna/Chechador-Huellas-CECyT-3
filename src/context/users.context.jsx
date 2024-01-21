import React, { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

  // function GetUsers

  return(
    <UserContext.Provider>
      { children }
    </UserContext.Provider>
  )
}