import { useEffect, useState } from 'react';
import api from '../api';
import useAuth from '../context/authContext';
import Activity from '../models/activity';

const useActivity = () => {
  const {user, isLoading } = useAuth();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const loading = dataLoading || isLoading;

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    api.activity.get(user.id).then((res) => {
      if (res) {
        setActivity(res.data);
      } else {
        setActivity(null);
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => setDataLoading(false));;
  }, [user]);

  return { activity, loading };
};

export default useActivity;
