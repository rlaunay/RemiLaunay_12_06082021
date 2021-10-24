import * as d3 from "d3";
import User from "../models/user";

type CircleSize = { width: number, height: number }

/**
 * Generate circular chart with given data
 * @param {HTMLDivElement | null} element Element where the graph will be insert
 * @param {CircleSize} size size of graph
 * @param {User | null} user data use for the graph
 */
export default function generateCircleChart(
  element: HTMLDivElement | null, 
  size: CircleSize, 
  user: User | null,
) {
  const container = d3.select(element).html('');

  if (!user) return;
  const { todayScore, score } = user;
  const currentScore = todayScore || score || 0;
  const { width, height } = size;

  const data = (2 * Math.PI) - (currentScore * (2 * Math.PI))
  console.log('score', score)

  const chart = container
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')

  chart
    .append('circle')
    .attr('cx', '0')
    .attr('cy', '0')
    .attr('r', '80')
    .attr("fill", "white")
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  chart
    .append("path")
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    // @ts-ignore
    .attr("d", d3.arc() 
      .innerRadius( 80 )
      .outerRadius( 90 )
      .startAngle( data )
      .endAngle( 2 * Math.PI )
      .cornerRadius(50)
    )
    .attr('fill', '#FF0000');

  chart
    .append('text')
    .text(`${currentScore * 100}%`)
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2  + ')')
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "text-after-edge")
    .attr('fill', '#282D30')
    .attr('font-weight', 'bold')
    .attr('font-size', '26')
  
  chart
    .append('text')
    .text('de votre')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2  + ')')
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr('fill', '#74798C')
    .attr('font-size', '18')

  chart
    .append('text')
    .text('objectif')
    .attr('transform', 'translate(' + width / 2 + ',' + (height / 2 + 26)  + ')')
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr('fill', '#74798C')
    .attr('font-size', '18')
  
  chart
    .append('text')
    .text('score')
    .attr('transform', 'translate(' + 30 + ',' + 24 + ')')
    .attr('fill', '#20253A')
    .attr('font-size', '15')
}