import * as d3 from "d3";
import { Session } from "../models/averageSessions";
import classes from './../components/Graph/LineChart/LineChart.module.scss';

type LineSize = { width: number, height: number }

const jour = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const tooltip = d3.select('body')
  .append('div')
  .attr('class', classes.tooltip)
  .style("display", 'none');

const dot = d3.select('body')
  .append('div')
  .attr('class', classes.dot)
  .style("display", 'none');

const voile = d3.select('body')
  .append('div')
  .attr('class', classes.voile)
  .style("display", 'none');

  /**
   * Generate linear chart with the data
   * @param {HTMLDivElement | null} element Element where the graph will be insert
   * @param {LineSize} size size of graph
   * @param {Session[] | undefined} data data use for the graph
   */
export default function generateLineChart(
  element: HTMLDivElement | null, 
  size: LineSize, 
  data: Session[] | undefined,
) {
  const container = d3.select(element).html('');

  if (!data) return;
  const { width, height } = size;

  const MAX = Math.max(...data.map(s => s.sessionLength)) + 10

  const xScale = d3
    .scaleLinear()
    .domain([1, 7])
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([0, MAX])
    .range([height, 0]);

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

  const xAxisGen = d3.axisTop(xScale);

  const chart = container
    .append('svg')
    .attr('viewBow', `0 0 ${height} ${width}`)
    .attr('class', classes.lineChart)
    .attr('height', height)
    .attr('width', width)
  // container = d3.select('#lineChart').attr('width', width).attr('height', height);

  chart
    .append('path')
    .attr('d', line(data))
    .attr('transform', `translate(0, 50)`)
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 3)
    .on('mouseover', (d, i) => {
      console.log()
      tooltip
        .style('top', `${d.pageY + -35}px`)
        .style('left', `${d.pageX + 10}px`)
        .style("display", 'block')
        .text(`${Math.floor(yScale.invert(d.offsetY - 50))}min`);
      
      dot
        .style('top', `${d.clientY}px`)
        .style('left', `${d.clientX}px`)
        .style("display", 'block');
      
      voile
        .style('top', `${d.clientY - d.offsetY}px`)
        .style('left', `${d.clientX}px`)
        .style('width', `${width - d.offsetX}px`)
        .style('height', `${height}px`)
        .style("display", 'block');
    })
    .on('mouseout', (d) => {
      tooltip
        .style('top', `0px`)
        .style('left', `0px`)
        .style("display", 'none')

      dot.style("display", 'none');
      voile.style("display", 'none');
    });
  
  chart
    .selectAll('.bar')
    .data<Session>(data)
    .enter()
    .append('text')
    .text((d) => jour[+d.day - 1])
    .attr("transform", (d) => `translate(${ (0.14 * d.day) * width - 14 },${height - 20})`)
    .attr("text-anchor", "middle")
    .attr('fill', '#FFFFFF')
    .attr('font-size', 12)

  chart
    .append('text')
    .text('Durée moyenne des')
    .attr('class', classes.title)
    .attr('transform', 'translate(34, 29)');

  chart
    .append('text')
    .text('sessions')
    .attr('class', classes.title)
    .attr('transform', 'translate(34, 49)');
}