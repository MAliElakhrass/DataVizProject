import { Component, OnInit, Input } from '@angular/core';
import { ClusteringConfig } from '../../graph-configuration';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubblechart',
  templateUrl: './bubblechart.component.html',
  styleUrls: ['./bubblechart.component.css']
})
export class BubblechartComponent implements OnInit {

  @Input() config: ClusteringConfig;

  private g;
  private x;
  private y;
  private r;
  private myColor;
  private tooltip;

  private width: number;
  private height: number;

  private showTooltip = function(d) {
    this.tooltip
        .transition()
        .duration(200)
    this.tooltip
        .style("opacity", 1)
        .html("Game: " + d.Name)
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px");
  }
  
  private moveTooltip = function(d) {
    this.tooltip
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px");
  }

  private hideTooltip = function(d) {
    this.tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
  }

  constructor() { }

  ngOnInit(): void {
    this.configuration();
    this.createSVGobject();
    this.setScaleDomain();
    this.createTooltip();
    this.createBubbleChart();
  }

  private configuration(): void {
    this.width = this.config.width - this.config.marginLeft - this.config.marginRight;
    this.height = this.config.height - this.config.marginTop - this.config.marginBottom;
  }

  private createSVGobject(): void {
    this.g = d3.select("#bubble-chart")
               .append("svg")
               .attr("width", this.config.width)
               .attr("height", this.config.height)
               .append("g")
               .attr("transform", "translate(" + this.config.marginLeft + "," + this.config.marginTop + ")")
  }

  private setScaleDomain(): void {
    let xValues = this.config.dataset.map(row => row.x);
    this.x = d3.scaleLinear().range([0, this.width]);
    this.x.domain([d3.min(xValues), d3.max(xValues)]);

    let yValues = this.config.dataset.map(row => row.y);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.y.domain([d3.min(yValues), d3.max(yValues)]);

    let rValues = this.config.dataset.map(row => row[this.config.radiusParameter]);
    this.r = d3.scaleLinear().range([2, 40]);
    this.r.domain([d3.min(rValues), d3.max(rValues)]);

    let colorValues = this.config.dataset.map(row => row.Genre);
    colorValues = [...new Set(colorValues)];
    this.myColor = d3.scaleOrdinal()
                     .domain(colorValues)
                     .range(d3.schemeSet2);
  }

  private createTooltip(): void {
    this.tooltip = d3.select("#bubble-chart")
                     .append("div")
                     .style("opacity", 0)
                     .attr("class", "tooltip")
                     .style("background-color", "black")
                     .style("border-radius", "5px")
                     .style("padding", "10px")
                     .style("color", "white")
  }

  private createBubbleChart(): void {
    this.g.append('g')
          .selectAll('dot')
          .data(this.config.dataset)
          .enter()
          .append('circle')
          .attr('class', 'bubbles')
          .attr('cx', d => this.x(d.x))
          .attr('cy', d => this.y(d.y))
          .attr('r', d => this.r(d[this.config.radiusParameter]))
          .style('fill', d => this.myColor(d.Genre));
          /*
          .on("mouseover", this.showTooltip )
          .on("mousemove", this.moveTooltip )
          .on("mouseleave", this.hideTooltip ); */
  }

}
