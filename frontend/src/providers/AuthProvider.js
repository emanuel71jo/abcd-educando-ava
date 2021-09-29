import jwtDecode from 'jwt-decode';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() => {
    const token = sessionStorage.getItem('@ABCDEducando_login');
    if (token) return token;
    return '';
  });

  const [profile, setProfile] = useState(null);

  const signIn = useCallback(async ({ email, password }) => {
    api
      .post('/signIn', { email, password })
      .then(({ data: { token } }) => {
        navigate('/dashboard', { replace: true });
        setAuth(token);
        sessionStorage.setItem('@ABCDEducando_login', token);
        setProfile({ ...jwtDecode(token) });
        alert('Usuário autenticado com sucesso!!');
      })
      .catch(() => {
        alert('Email ou senha inválidos!!');
      });
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@ABCDEducando_login');
    setAuth('');
  }, []);

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
