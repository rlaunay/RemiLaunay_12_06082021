import { useEffect, useState } from 'react';
import api from '../api';
import Activity from '../models/activity';

const useActivity = (id: number) => {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    api.activity.get(id).then((res) => {
      if (res) {
        setActivity(res.data);
      } else {
        setActivity(null);
      }
    });
  }, []);

  return { activity };
};

export default useActivity;
