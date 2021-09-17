import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import classes from './CircleChart.module.scss';
import useAuth from '../../../context/authContext';

const CircleChart: React.FC = () => {
  const { user } = useAuth();
  const container = useRef(null);

  useEffect(() => {
    const chart = d3.select(container.current).html('');

    if (!user) return;
    const { score } = user;
    const width = 260;
    const height = 260;

    chart
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      
    
  }, [user, user?.score])

  return  <div ref={container} id="circle-chart" className={classes.container}></div>;
};

export default CircleChart;
