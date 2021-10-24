import React from 'react';
import BarChart from '../components/Graph/BarChart';
import CircleChart from '../components/Graph/CircleChart';
import LineChart from '../components/Graph/LineChart';
import SpiderChart from '../components/Graph/SpiderChart';
import KeysDatas from '../components/KeysDatas';
import useAuth from '../context/authContext';

import classes from './Dashboard.module.scss';

/**
 * Dashboardpage display all data in graph
 * @return {React.ReactElement}
 */
const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className={classes.container}>
      {user && <KeysDatas keydata={user.keyData} />}
      <div className={classes.gridchart}>
        <BarChart />
        <LineChart />
        <SpiderChart />
        <CircleChart />
      </div>
    </div>
  );
};

export default Dashboard;
