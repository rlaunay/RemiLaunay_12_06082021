import React from 'react';
import LineChart from './components/Graph/LineChart';
import Layout from './components/Layout';
import Header from './components/Layout/Header';
import useAuth from './context/authContext';
import Dashboard from './pages/dashboard';

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
        user && (
          <React.Fragment>
            <Header />
            <Dashboard />
          </React.Fragment>
        )
      )}
    </Layout>
  );
};

export default App;
