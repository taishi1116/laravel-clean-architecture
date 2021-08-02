import React, { useState, useEffect } from 'react';

type GlobalContextState = {
  token: string | null;
  userId: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

const globalContextState: GlobalContextState = {
  token: null,
  userId: null,
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setToken: () => {},
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setUserId: () => {},
};

export const globalContext = React.createContext<GlobalContextState>(globalContextState);

export const GlobalContextWrapper = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('auth-token'));
    setUserId(localStorage.getItem('user-id'));
  }, []);

  return <globalContext.Provider value={{ token, userId, setToken, setUserId }}>{children}</globalContext.Provider>;
};
