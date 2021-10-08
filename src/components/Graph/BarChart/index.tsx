import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import classes from './BarChart.module.scss';
import useActivity from '../../../hooks/useActivity';
import { ActivitySession } from '../../../models/activity';

const BarChart: React.FC = () => {
  const { activity, loading } = useActivity();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = d3.select(containerRef.current).html('');

    if (!activity) return;
    const width = 800;
    const height = 300;

    const MAX_KILO = Math.max(...activity.sessions.map(s => s.kilogram)) + 1;
    const MIN_KILO = Math.min(...activity.sessions.map(s => s.kilogram)) - 1;
    const DIFF_KILO = MAX_KILO - MIN_KILO;

    const MAX_CALO = Math.max(...activity.sessions.map(s => s.calories)) + 50;

    const findMax = (key: string) => key === 'kilogram' ? DIFF_KILO : MAX_CALO;
    const calcValue = (data: { key: string, value: number }) => {
      let value = data.value;
      if (data.key === 'kilogram') {
        value = data.value - MIN_KILO;
      }
      return (value * height) / findMax(data.key)
    }

    const xScale = d3
      .scaleBand()
      .domain(activity.sessions.map(dataPoint => dataPoint.day))
      .rangeRound([0, width])
      .padding(0.5);

    const subgroups: ['kilogram', 'calories'] = ['kilogram', 'calories']
    const xSubScale = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, xScale.bandwidth()])
      .padding(1)

    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);

    const chart = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const COLORS = {
      kilogram: '#282D30',
      calories: '#E60000'
    }

    const radius = 4;
    
    chart
      .selectAll('.bar')
      .data<ActivitySession>(activity.sessions)
      .enter()
      .append('g')
      .attr("transform", (d) => `translate(${xScale(d.day)},0)`)
      .selectAll('rect')
      .data((d) => (subgroups.map((key) => ({key: key, value: d[key]}))))
      .enter()
      .append("path")
      .attr('fill', (d) => COLORS[d.key])
      .attr("d", d => `
        M${xSubScale(d.key)},${yScale(calcValue(d)) + radius}
        a${radius},${radius} 0 0 1 ${radius},${-radius}
        h${7 - 2 * radius}
        a${radius},${radius} 0 0 1 ${radius},${radius}
        v${yScale(height - calcValue(d)) - radius}
        h${-(7)}Z
      `);
      // .append("rect")
      // .attr("x", (d) => (xSubScale(d.key) ?? ''))
      // .attr("y", (d) => yScale(calcValue(d)))
      // .attr("width", xSubScale.bandwidth())
      // .attr("height", (d) => (height - calcValue(d)))
      // .append('rect')
      // .classed(classes.bar, true)
      // .attr("rx", "10")
      // .attr("ry", "10")
      // .attr('width', "10")
      // .attr('height', (data) => height - yScale((data.value * height) / 600))
      // .attr('x', data => xScale(data.key) ?? '')
      // .attr('y', data => yScale((data.value * height) / 600))

  }, [activity, loading])

  if (loading) return <h3>Ca charge ...</h3>;
  return <div ref={containerRef} className={classes.container}></div>;
};

export default BarChart;
