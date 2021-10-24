import { useEffect, useState } from 'react';
import AverageSessions from '../models/averageSessions';
import api from '../api';
import useAuth from '../context/authContext';

type AverageSessionsReturn = { averageSessions: AverageSessions | null, loading: boolean }

/**
 * Hooks for getting average sessions data of authenticated user
 * @returns {AverageSessionsReturn}
 */
const useAverageSessions = (): AverageSessionsReturn => {
  const {user, isLoading } = useAuth();
  const [averageSessions, setAverageSessions] = useState<AverageSessions | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const loading = dataLoading || isLoading;

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    api.averageSessions.get(user.id).then((res) => {
      if (res) {
        setAverageSessions(res.data);
      } else {
        setAverageSessions(null);
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => setDataLoading(false));;
  }, [user]);

  return { averageSessions, loading };
};

export default useAverageSessions;
