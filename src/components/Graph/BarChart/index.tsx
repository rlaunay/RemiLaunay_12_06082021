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
    const height = 320;
    const padding = 50;

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
      return (value * (height - padding)) / findMax(data.key)
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

    const yScale = d3.scaleLinear().domain([0, height]).range([height - padding, 0]);
    const y2Scale = d3.scaleLinear().domain([MIN_KILO, MAX_KILO]).range([height - padding, padding]);

    const chart = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    
    console.log('ouiisid', xScale("6"))

    const COLORS = {
      kilogram: '#282D30',
      calories: '#E60000'
    }

    const radius = 4;

    chart
      .append('g')
      .attr("transform", `translate(${width},0)`)
      .attr('class', classes.yAxis)
      // @ts-ignore
      .call(d3.axisLeft(y2Scale).tickFormat((d, i) => {
        if (Number.isInteger(d)) {
          chart
            .append('line')
            .attr('x1', 0)
            .attr('y1', 1)
            .attr('x2', (xScale(activity.sessions[6].day) || 0) - (xScale(activity.sessions[0].day) || 0) + 25)
            .attr('y2', 1)
            .attr('stroke', '#DEDEDE')
            .attr('stroke-dasharray', i === 0 ? 0 : 5)
            .attr('class', classes.axisBar)
            .attr('transform', `translate(${(xScale(activity.sessions[0].day) || 0) + 17.5}, ${y2Scale(d)})`)
            
          
          return d;
        } else {
          return null;
        }
      })
        .tickPadding(10)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickSize(0)
      )
    
    const enterData = chart
      .selectAll('.bar')
      .data<ActivitySession>(activity.sessions)
      .enter()

    enterData
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
    
    enterData
      .append("text")
      .attr("transform", (d) => `translate(${(xScale(d.day) || 0) + xScale.bandwidth() / 2},${height - 10})`)
      .attr("text-anchor", "start")
      .attr('class', classes.xAxis)
      .text((d, i) => i + 1);

    chart
      .append('text')
      .text('Activité quotidienne')
      .attr('class', classes.title)
      .attr('transform', 'translate(70, 29)');

    chart
      .append('text')
      .text('Poids (kg)')
      .attr('class', classes.legend)
      .attr('transform', 'translate(520, 29)');

    chart
      .append('circle')
      .attr('cx', '5')
      .attr('cy', '5')
      .attr('r', '5')
      .attr('fill', '#E60000')
      .attr('transform', 'translate(500, 20)');

    chart
      .append('text')
      .text('Calories brûlées (kCal)')
      .attr('class', classes.legend)
      .attr('transform', 'translate(640, 29)');

    chart
      .append('circle')
      .attr('cx', '5')
      .attr('cy', '5')
      .attr('r', '5')
      .attr('fill', 'rgb(40, 45, 48)')
      .attr('transform', 'translate(620, 20)');

  }, [activity, loading])

  if (loading) return <h3>Ca charge ...</h3>;
  return <div ref={containerRef} className={classes.container}></div>;
};

export default BarChart;
