import React, { useState, useEffect } from 'react';

type GlobalContextState = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const globalContextState: GlobalContextState = {
  token: null,
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setToken: () => {},
};

export const globalContext = React.createContext<GlobalContextState>(globalContextState);

export const GlobalContextWrapper = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('auth-token'));
  }, []);

  return <globalContext.Provider value={{ token, setToken }}>{children}</globalContext.Provider>;
};
