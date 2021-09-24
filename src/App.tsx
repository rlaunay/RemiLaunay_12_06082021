import { Fragment } from 'react';
import SpiderChart from './components/Graph/SpiderChart';
import Layout from './components/Layout';
import Header from './components/Layout/Header';
import useAuth from './context/authContext';
import Dashboard from './pages/Dashboard';

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
        <>
          <p>Une erreur est survenue!</p>
          <SpiderChart />
        </>
      ) : (
        user && (
          <Fragment>
            <Header />
            <Dashboard />
          </Fragment>
        )
      )}
    </Layout>
  );
};

export default App;
