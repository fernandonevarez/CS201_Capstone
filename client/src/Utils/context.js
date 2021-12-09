
import React, { useState, useContext } from "react";

// import {useFetch} from "./useFetch";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  
  // const [query, setQuery] = useState("batman")
  // const {loading, error, attractions} = useFetch(`s=${query}&`)

  return (
    <AppContext.Provider value={{  }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
