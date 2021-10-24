import { useEffect, useState } from 'react';
import Performance from '../models/performance';
import api from '../api';
import useAuth from '../context/authContext';

type PerformanceReturn = { performance: Performance | null, loading: boolean }

/**
 * Hooks for getting performance data of authenticated user
 * @returns {PerformanceReturn}
 */
const usePerformance = (): PerformanceReturn => {
  const { user, isLoading } = useAuth();
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const loading = dataLoading || isLoading;

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    api.performance.get(user.id)
      .then((res) => {
        if (res) {
          setPerformance(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setDataLoading(false));
  }, [user]);

  return { performance, loading };
};

export default usePerformance;
