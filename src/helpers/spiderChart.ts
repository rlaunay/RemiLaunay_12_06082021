import * as d3 from "d3";
import { Data } from "../models/performance";

type Options = { radius: number, size: number }

/**
 * Generate Spiderchart with the given data
 * @param {HTMLDivElement | null} element Element where the graph will be insert
 * @param {Options} opt Sizing paramters for the graph
 * @param {Data[] | undefined} data data use for the graph
 */
export default function generateSpiderChart(
  element: HTMLDivElement | null, 
  opt: Options, 
  data: Data[] | undefined,
) {
  const container = d3.select(element).html('');

    if (!data) return;
    const { size, radius } = opt;

    const MAX = Math.max(...data.map(d => d.value)) + 10

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
          const x = size/2 + (radius * j + 17) * Math.cos(angle_rad);
          const y = size/2 + (radius * j + 17) * Math.sin(angle_rad);

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
      const dataFind = data.find((d) => d.kind === k)?.value;
      if (!dataFind) throw new Error('no data');
      const pourcent = Math.floor((dataFind / MAX) * (radius * 5));
      const angle_deg = 60 * i - 30;
      const angle_rad = Math.PI / 180 * angle_deg;
      return [size/2 + pourcent * Math.cos(angle_rad), size/2 + pourcent * Math.sin(angle_rad)];
    }).map((p) => p.join(',')).join(' ');

    chart.append("polygon")
        .attr("points", dataPoint)
        .attr("fill", "red")
        .style('opacity', .7)
}