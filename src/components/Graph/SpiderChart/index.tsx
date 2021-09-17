import React, { useEffect } from 'react';
import * as d3 from 'd3';
import usePerformance from './../../../hooks/usePerformance';

import classes from './SpiderChart.module.scss';

const SpiderChart: React.FC = () => {
  const { performance, loading } = usePerformance();

  console.log(loading);

  useEffect(() => {
    d3.select('#spider-chart').html('')

    if (!performance) return;
    const size = 260;
    const radius = 20;

    const chart = d3
      .select('#spider-chart')
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('g')

    const line = [1, 2, 3, 4, 5]

    line.forEach((j) => {
      const graphPoint = [0, 1, 2, 3, 4, 5].map((i) => {
        const angle_deg = 60 * i - 30;
        const angle_rad = Math.PI / 180 * angle_deg;
        return [size/2 + (radius * j) * Math.cos(angle_rad), size/2 + (radius * j) * Math.sin(angle_rad)];
      }).map((p) => p.join(',')).join(' ');
  
      chart.append("polygon")
        .attr("points", `${graphPoint}`)
        .attr("fill", "none")
        .attr("stroke", "white")
    })

    const dataPoint = [5, 4, 3, 2, 1, 6].map((k, i) => {
      const data = performance.data.find((d) => d.kind === k)?.value;
      if (!data) throw new Error('no data');
      const pourcent = Math.floor((data * 100) / 250);
      const angle_deg = 60 * i - 30;
      const angle_rad = Math.PI / 180 * angle_deg;
      return [size/2 + pourcent * Math.cos(angle_rad), size/2 + pourcent * Math.sin(angle_rad)];
    }).map((p) => p.join(',')).join(' ');

    chart.append("polygon")
        .attr("points", dataPoint)
        .attr("fill", "red")
        .style('opacity', .7)


  }, [performance, loading])

  if (loading) return <h3>Ca charge ...</h3>;
  return <div id="spider-chart" className={classes.container}></div>;
};

export default SpiderChart;
