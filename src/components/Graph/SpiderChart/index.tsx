import { useEffect, useRef } from 'react';
import usePerformance from './../../../hooks/usePerformance';

import classes from './SpiderChart.module.scss';
import useWindowSize from '../../../hooks/useWindowSize';
import generateSpiderChart from '../../../helpers/spiderChart';

/**
 * SpiderChart React component
 * @returns {React.ReactElement}
 */
const SpiderChart: React.FC = () => {
  const { performance, loading } = usePerformance();
  const containerRef = useRef(null);

  let opt = { size: 260, radius: 20 };

  const { width } = useWindowSize();

  if (width <= 1420) {
    opt = { size: 230, radius: 17 };
  }

  useEffect(() => {
    generateSpiderChart(containerRef.current, opt, performance?.data)
  }, [performance, loading, opt])

  if (loading) return <h3>Ca charge ...</h3>;
  return <div ref={containerRef} id="spider-chart" className={classes.container}></div>;
};

export default SpiderChart;
