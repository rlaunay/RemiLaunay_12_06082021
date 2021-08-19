import React, { useContext, useEffect, useState } from 'react';
import User from '../models/user';
import api from '../api';

const ID = 12;

const AuthContext = React.createContext<{
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}>({
  user: null,
  isLoading: false,
  error: null,
});

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

export default function useAuth() {
  return useContext(AuthContext);
}
