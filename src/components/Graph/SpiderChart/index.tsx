import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import usePerformance from './../../../hooks/usePerformance';

import classes from './SpiderChart.module.scss';

const SpiderChart: React.FC = () => {
  const { performance, loading } = usePerformance();
  const containerRef = useRef(null);

  console.log(loading);

  useEffect(() => {
    const container = d3.select(containerRef.current).html('');

    if (!performance) return;
    const size = 260;
    const radius = 20;

    const MAX = Math.max(...performance.data.map(d => d.value)) + 10

    const chart = container
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('g')

    const line = [1, 2, 3, 4, 5]
    const labels = ['speed', 'strength', 'endurance', 'energy', 'cardio', 'intensity']

    line.forEach((j) => {
      const graphPoint = [0, 1, 2, 3, 4, 5].map((i) => {
        const angle_deg = 60 * i - 30;
        const angle_rad = Math.PI / 180 * angle_deg;

        if (j === 5) {
          const x = size/2 + (117) * Math.cos(angle_rad);
          const y = size/2 + (117) * Math.sin(angle_rad);

          chart
            .append('text')
            .text(labels[i])
            .attr('x', x)
            .attr('y', y)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr('font-size', '10')
            .attr('font-weight', 'regular')
            .attr('fill', 'white')
        }

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
      const pourcent = Math.floor((data * 100) / MAX);
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
  return <div ref={containerRef} id="spider-chart" className={classes.container}></div>;
};

export default SpiderChart;
