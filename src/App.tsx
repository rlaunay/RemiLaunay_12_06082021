import React from 'react';
import LineChart from './components/Graph/LineChart';
import Layout from './components/Layout';
import Header from './components/Layout/Header';
import useAuth from './context/authContext';

/**
 * @return {React.ReactElement}
 */
const App: React.FC = (): React.ReactElement => {
  const { isLoading, error, user } = useAuth();
  return (
    <Layout>
      {isLoading ? (
        <p>Ca charge...</p>
      ) : error ? (
        <p>Une erreur est survenue!</p>
      ) : (
        <React.Fragment>
          <Header />
          <LineChart />
        </React.Fragment>
      )}
    </Layout>
  );
};

export default App;
