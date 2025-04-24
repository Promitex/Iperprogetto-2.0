import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [categoria, setCategoria] = useState(null);
  const [tipologia, setTipologia] = useState(null);
  const [sottoTipologia, setSottoTipologia] = useState(null);
  const [voceSelezionata, setVoceSelezionata] = useState(null);

  return (
    <AppStateContext.Provider value={{
      categoria,
      setCategoria,
      tipologia,
      setTipologia,
      sottoTipologia,
      setSottoTipologia,
      voceSelezionata,
      setVoceSelezionata
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
