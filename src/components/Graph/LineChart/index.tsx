import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Session } from '../../../models/averageSessions';

import classes from './LineChart.module.scss';
import useAverageSessions from '../../../hooks/useAverageSessions';
import useAuth from '../../../context/authContext';

const DUMMY_DATA = [
  { day: 1, sessionLength: 30 },
  { day: 2, sessionLength: 40 },
  { day: 3, sessionLength: 50 },
  { day: 4, sessionLength: 30 },
  { day: 5, sessionLength: 30 },
  { day: 6, sessionLength: 50 },
  { day: 7, sessionLength: 50 },
];

const jour = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const LineChart: React.FC = () => {
  const { user } = useAuth();
  const { averageSessions } = useAverageSessions(user!.id);

  useEffect(() => {
    let container = null;
    const width = 260;
    const height = 260;
    // const margin = 10;

    if (!averageSessions) return;

    const xScale = d3
      .scaleLinear()
      .domain([1, 7])
      .range([0, width - 20]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 60]) // TODO domain dynamique
      .range([75, height - 30]);

    const xAccessor = (d: Session): number => {
      return d.day;
    };

    const yAccessor = (d: Session): number => {
      return d.sessionLength;
    };

    const line = d3
      .line<Session>()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))
      .curve(d3.curveBasis);

    const xAxisGen = d3.axisTop(xScale).tickSizeOuter(0);

    container = d3.select('#lineChart').attr('width', width).attr('height', height);

    container
      .append('g')
      .append('path')
      .attr('d', line(averageSessions.sessions))
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 1);

    container
      .append('text')
      .text('Durée moyenne des')
      .attr('class', classes.title)
      .attr('transform', 'translate(34, 29)');
    container.append('text').text('sessions').attr('class', classes.title).attr('transform', 'translate(34, 49)');

    container
      .append('g')
      .attr('transform', `translate(0, ${height + 9})`)
      .attr('class', classes.xAxis)
      .call(
        xAxisGen
          .ticks(7)
          .tickPadding(20)
          .tickFormat((d) => jour[+d - 1]),
      );
  }, [averageSessions]);

  return (
    <div className={classes.container}>
      <svg id="lineChart"></svg>
    </div>
  );
};

export default LineChart;
