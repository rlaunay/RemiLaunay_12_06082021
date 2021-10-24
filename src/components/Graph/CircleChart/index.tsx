import { useEffect, useRef } from 'react';
import classes from './CircleChart.module.scss';
import useAuth from '../../../context/authContext';
import generateCircleChart from '../../../helpers/circleChart';
import useWindowSize from '../../../hooks/useWindowSize';

/**
 * Circular Chart React component
 * @returns {React.ReactElement}
 */
const CircleChart: React.FC = () => {
  const { user } = useAuth();
  const containerRef = useRef(null);
  let size = { width: 260, height: 260 };

  const { width } = useWindowSize();

  if (width <= 1420) {
    size = { width: 230, height: 230 }
  }
  
  useEffect(() => {
    generateCircleChart(containerRef.current, size, user)
  }, [user, user?.todayScore, size])

  return  (
    <div ref={containerRef} id="circle-chart" className={classes.container}>
    </div>
  );
};

export default CircleChart;
