import React from 'react';
import LineChart from '../components/Graph/LineChart';
import KeysDatas from '../components/KeysDatas';
import useAuth from '../context/authContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {user && <KeysDatas keydata={user.keyData} />}
      <LineChart />
    </div>
  );
};

export default Dashboard;
