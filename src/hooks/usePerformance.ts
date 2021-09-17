import { useEffect, useState } from 'react';
import Performance from '../models/performance';
import api from '../api';
import useAuth from '../context/authContext';

const usePerformance = () => {
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
