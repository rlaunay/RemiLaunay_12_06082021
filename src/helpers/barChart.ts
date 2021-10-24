import * as d3 from 'd3';
import { ActivitySession } from '../models/activity';
import classes from './../components/Graph/BarChart/BarChart.module.scss'

type BarSize = { width: number, height: number, padding: number }

const tooltip = 
  d3.select('body')
    .append('div')
    .attr('class', classes.tooltip)
    .style("display", 'none');

/**
 * Generate Bargraph with given data
 * @param {HTMLDivElement | null} element Element where the graph will be insert
 * @param {BarSize} size size of graph
 * @param {ActivitySession[] | undefined} sessions data use for the graph
 */
export default function generateBarChart(
  element: HTMLDivElement | null, 
  size: BarSize, 
  sessions: ActivitySession[] | undefined,
) {
  const container = d3.select(element).html('');

  if (!sessions) return;
  const { width, height, padding } = size;

  const MAX_KILO = Math.max(...sessions.map(s => s.kilogram)) + 1;
  const MIN_KILO = Math.min(...sessions.map(s => s.kilogram)) - 1;
  const DIFF_KILO = MAX_KILO - MIN_KILO;

  const MAX_CALO = Math.max(...sessions.map(s => s.calories)) + 50;

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
    .domain(sessions.map(dataPoint => dataPoint.day))
    .rangeRound([0, width])
    .padding(0.5);

  const subgroups: ['kilogram', 'calories'] = ['kilogram', 'calories']
  const xSubScale = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, xScale.bandwidth()])
    .padding(.7)

  const yScale = d3.scaleLinear().domain([0, height]).range([height - padding, 0]);
  const y2Scale = d3.scaleLinear().domain([MIN_KILO, MAX_KILO]).range([height - padding, padding]);

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
          .attr('x2', (xScale(sessions[6].day) || 0) - (xScale(sessions[0].day) || 0) + 25)
          .attr('y2', 1)
          .attr('stroke', '#DEDEDE')
          .attr('stroke-dasharray', i === 0 ? 0 : 5)
          .attr('class', classes.axisBar)
          .attr('transform', `translate(${(xScale(sessions[0].day) || 0) + 17.5}, ${y2Scale(d)})`)
          
        
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
    .data<ActivitySession>(sessions)
    .enter()

  enterData
    .append('rect')
    .on('mouseover', (d, i) => {
      console.log(d)
      console.log(i)
      tooltip
        .style('top', `${d.relatedTarget.parentNode.offsetTop + padding - 18}px`)
        .style('left', `${d.relatedTarget.parentNode.offsetLeft + xScale(i.day) + 60}px`)
        .style("display", 'flex');
      tooltip.append('div').text(`${i.kilogram}kg`)
      tooltip.append('div').text(`${i.calories}Kcal`)
      
      d3.select(d.toElement).attr('fill', '#ccc').style('opacity', 0.5)
    })
    .on('mouseout', (d, i) => {
      d3.select(d.srcElement).attr('fill', 'transparent')
      tooltip.style('display', 'none')
      tooltip.html('')
    })
    .attr('height', height - padding * 2)
    .attr('width', xScale.bandwidth())
    .attr('fill', 'transparent')
    .attr("transform", (d) => `translate(${xScale(d.day)},${padding})`)

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
    `)
    .style('pointer-events', 'none');
  
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
    .attr('transform', `translate(${width - 250}, 29)`);

  chart
    .append('circle')
    .attr('cx', '5')
    .attr('cy', '5')
    .attr('r', '5')
    .attr('fill', '#E60000')
    .attr('transform', `translate(${width - 270}, 20)`);

  chart
    .append('text')
    .text('Calories brûlées (kCal)')
    .attr('class', classes.legend)
    .attr('transform', `translate(${width - 150}, 29)`);

  chart
    .append('circle')
    .attr('cx', '5')
    .attr('cy', '5')
    .attr('r', '5')
    .attr('fill', 'rgb(40, 45, 48)')
    .attr('transform', `translate(${width - 170}, 20)`);
}