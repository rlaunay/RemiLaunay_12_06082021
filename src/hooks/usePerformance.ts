import { useEffect, useState } from 'react';
import Performance from '../models/performance';
import api from '../api';

const usePerformance = (id: number) => {
  const [performance, setPerformance] = useState<Performance | null>(null);

  useEffect(() => {
    api.performance.get(id).then((res) => {
      if (res) {
        setPerformance(res.data);
      } else {
        setPerformance(null);
      }
    });
  }, []);

  return { performance };
};

export default usePerformance;
