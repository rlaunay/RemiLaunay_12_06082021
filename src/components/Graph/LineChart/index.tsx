import { useEffect, useRef } from 'react';

import classes from './LineChart.module.scss';
import useAverageSessions from '../../../hooks/useAverageSessions';
import useWindowSize from '../../../hooks/useWindowSize';
import generateLineChart from '../../../helpers/lineChart';

/**
 * Linear Chart React component
 * @returns {React.ReactElement}
 */
const LineChart: React.FC = () => {
  let { averageSessions, loading } = useAverageSessions();
  const containerRef = useRef(null);
  let size = { width: 260, height: 260 };

  const { width } = useWindowSize();

  if (width <= 1420) {
    size = { width: 230, height: 230 }
  }

  useEffect(() => {
    generateLineChart(containerRef.current, size, averageSessions?.sessions)
  }, [averageSessions, loading, size]);

  if (loading) return <h3>Ca charge ...</h3>;
  return (
    <div ref={containerRef} id="line-chart" className={classes.container}></div>
  );
};

export default LineChart;
