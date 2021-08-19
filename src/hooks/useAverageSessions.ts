import { useEffect, useState } from 'react';
import AverageSessions from '../models/averageSessions';
import api from '../api';

const usePerformance = (id: number, key: string) => {
  const [averageSessions, setAverageSessions] = useState<AverageSessions | null>(null);

  useEffect(() => {
    api.averageSessions.get(id).then((res) => {
      if (res) {
        setAverageSessions(res.data);
      } else {
        setAverageSessions(null);
      }
    });
  }, []);

  return { averageSessions };
};

export default usePerformance;
