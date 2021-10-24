import { useEffect, useRef } from 'react';

import classes from './BarChart.module.scss';
import useActivity from '../../../hooks/useActivity';
import useWindowSize from '../../../hooks/useWindowSize';
import generateBarChart from '../../../helpers/barChart';

/**
 * Bar chart React component
 * @returns {React.ReactElement}
 */
const BarChart: React.FC = () => {
  const { activity, loading } = useActivity();
  const containerRef = useRef(null);
  let size = { width: 800, height: 320, padding: 50 };

  const { width } = useWindowSize();

  if (width <= 1420) {
    size = { width: 700, height: 300, padding: 50 };
  }

  useEffect(() => {
    generateBarChart(containerRef.current, size, activity?.sessions);
  }, [activity, loading, size])

  if (loading) return <h3>Ca charge ...</h3>;
  return <div ref={containerRef} className={classes.container}></div>;
};

export default BarChart;
