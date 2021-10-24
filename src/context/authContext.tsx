import React, { useContext, useEffect, useState, createContext } from 'react';
import User from '../models/user';
import api from '../api';

const ID = 18;

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
});

/**
 * Provider for authentication state
 * @param {React.ComponentProps} props 
 * @returns {React.ReactElement}
 */
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsloading(true);
    api.user
      .get(ID)
      .then((res) => {
        if (res) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch((error: Error) => {
        setError(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, error }}>{children}</AuthContext.Provider>;
};

/**
 * hooks for consume AuthContext
 * @returns {AuthContextType}
 */
export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
