import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  updateAccessToken: (newAccessToken: string) => void;
  updateRefreshToken: (newRefreshToken: string) => void;
  clearTokens: () => void;
};

interface IAuthProviderProps {
  children: ReactNode;
}

// Contexte pour gérer le refresh token
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  updateAccessToken: (newAccessToken: string) => {},
  updateRefreshToken: (newRefreshToken: string) => {},
  clearTokens: () => {},
});

export const AuthProvider:FC<IAuthProviderProps> = (props) => {
  const { children } = props

  // les state se chargent avant le localStorage, prevoir solution pour init direct
  const [accessToken, setAccessToken] = useState<string | null>("");
  const [refreshToken, setRefreshToken] = useState<string | null>("");

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'))
    setRefreshToken(localStorage.getItem('refreshToken'))
  }, []);

  // mettre à jour accesstoken
  const updateAccessToken = (newAccessToken: string) => {
    localStorage.setItem('accessToken', newAccessToken);
    setAccessToken(newAccessToken);
  };

  // mettre à jour refreshtoken
  const updateRefreshToken = (newRefreshToken: string) => {
    localStorage.setItem('refreshToken', newRefreshToken);
    setRefreshToken(newRefreshToken);
  };

  // effacer les tokens
  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, updateAccessToken, updateRefreshToken, clearTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte d'authentification
export const useAuth = (): AuthContextType => useContext(AuthContext);
