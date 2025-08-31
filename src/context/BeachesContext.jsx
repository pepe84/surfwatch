import { createContext, useContext, useEffect, useState } from "react";
import beachesData from "../data/beaches.json";

const BeachesContext = createContext();

export function BeachesProvider({ children }) {
  const [beaches, setBeaches] = useState({});

  useEffect(() => {
    // Si en el futur voleu carregar-ho via fetch, es pot canviar aquí
    setBeaches(beachesData);
  }, []);

  return (
    <BeachesContext.Provider value={beaches}>
      {children}
    </BeachesContext.Provider>
  );
}

export function useBeaches() {
  return useContext(BeachesContext);
}
