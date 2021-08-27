import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

type Data = {
  day: number;
  sessionLength: number;
};

const LineChart: React.FC = () => {
  useEffect(() => {
    //   const width = 400;
    // const height = 100;
    // const margin = 10;

    const xScale = d3.scaleLinear().domain([1, 7]).range([10, 390]);
    const yScale = d3.scaleLinear().domain([0, 60]).range([10, 390]);

    const xAccessor = (d: Data): number => {
      return d.day;
    };

    const yAccessor = (d: Data): number => {
      return d.sessionLength;
    };

    const line = d3
      .line<Data>()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))
      .curve(d3.curveBasis);

    const xAxisGen = d3.axisBottom(xScale);

    const container = d3.select('#lineChart').attr('width', 400).attr('height', 400);

    container
      .append('g')
      .append('path')
      .attr('d', line(DUMMY_DATA))
      .attr('fill', 'none')
      .attr('stroke', 'Red')
      .attr('stroke-width', 2);

    container.append('text').text('Salut');

    container.append('g').call(xAxisGen.ticks(7).tickFormat((d) => jour[+d - 1]));
  }, []);

  return (
    <div>
      <svg id="lineChart"></svg>
    </div>
  );
};

export default LineChart;
