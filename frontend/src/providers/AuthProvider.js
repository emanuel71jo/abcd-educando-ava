import { useEffect, useCallback, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const tokensSession = 'sdfasdfFASDG51D5F1A231D23F123SDF';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem('@ABCDEducando_login');
    if (token) return token;
    return null;
  });

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setAuth(tokensSession);
      sessionStorage.setItem('@ABCDEducando_login', tokensSession);
    } catch (error) {
      alert('Email ou senha inválidos');
    }
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@ABCDEducando_login');
    setAuth('');
  }, []);

  return <AuthContext.Provider value={{ auth, signIn, signOut }}>{children}</AuthContext.Provider>;
};
