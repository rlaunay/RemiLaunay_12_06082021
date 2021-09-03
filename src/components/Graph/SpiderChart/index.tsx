import React, { useEffect } from 'react';
import * as d3 from 'd3';

import classes from './SpiderChart.module.scss';

const SpiderChart: React.FC = () => {

  useEffect(() => {
    console.log('oui');

    const size = 600;

    const chart = d3
      .select('#spider-chart')
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('g')
    
    let radialScale = d3.scaleLinear()
      .domain([0,10])
      .range([0,250]);
    let ticks = [2,4,6,8,10];

    chart.append("polygon")
      .attr("points", `${size / 2}, 0 ${size * (3/4)}, ${size * 1/4}`)
      .attr("fill", "none")
      .attr("stroke", "gray")


    // ticks.forEach(t =>
    //   chart.append("polygon")
    //   .attr("points", '100, 100 200,200 300,300')
    //   .attr("fill", "none")
    //   .attr("stroke", "gray")
    //   .attr("r", radialScale(t))
    // );
  


  }, [])

  return <div id="spider-chart" className={classes.container}></div>;
};

export default SpiderChart;


type Oui = { [key: string]: Oui | string }
type TradParams = { [key: string]: string } | null

const DICT: Oui = {
  "home": {
    "title": "salut {{ user1 }} et {{ user2 }}"
  }
}

function trad(path: string, params: TradParams = null) {
  const splitPath = path.split('.');
  let str = splitPath.reduce<Oui | string>((acc, val) => {
    if (typeof acc === 'string') return acc
    return acc[val];
  }, DICT)
  if (!str || typeof str !== 'string') throw new Error('Path not found')

  if (params) {
    str = Object.entries(params).reduce((acc, [key, val]) => {
      const regexp = new RegExp(`{{(\\s|\\S)(${key})(\\s|\\S)}}`)
      return acc.replace(regexp, val)
    }, str)
  }

  return str;
}

console.log(trad('home', { user1: 'Rémi', user2: 'Nicolas' }))
