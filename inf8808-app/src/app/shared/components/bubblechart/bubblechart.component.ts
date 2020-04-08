import { Component, OnInit, Input } from '@angular/core';
import { ClusteringConfig } from '../../graph-configuration';
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend'
import d3Tip from "d3-tip";


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
  private tip;
  private width: number;
  private height: number;

  public foods: string[] = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'];

  constructor() { }

  ngOnInit(): void {
    this.configuration();
    this.createSVGobject();
    this.setScaleDomain();
    this.createTooltip();
    this.createBubbleChart();
    this.addLegend();
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
               .call(d3.zoom().on("zoom", d => {
                 this.g.attr("transform", d3.event.transform)
               }))
               .append("g")
               .attr("transform", "translate(" + this.config.marginLeft + "," + this.config.marginTop + ")");
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
    this.tip = d3Tip().attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(d => "Game: " + d.Name)
  }

  private createBubbleChart(): void {
    this.g.call(this.tip);
    this.g.append('g')
          .selectAll('dot')
          .data(this.config.dataset)
          .enter()
          .append('circle')
          .attr('class', 'bubbles')
          .attr('cx', d => this.x(d.x))
          .attr('cy', d => this.y(d.y))
          .attr('r', d => this.r(d[this.config.radiusParameter]))
          .style('fill', d => this.myColor(d.Genre))
          .style('fill-opacity', 0.8)
          .style('stroke', 'black')
          .style('stroke-width', 0.1)
          .on('mouseover', this.tip.show)
          .on('mouseout', this.tip.hide);
  }

  private getPalette(domains) {
    let palette = [];
    for (let domain in domains) {
      palette.push(this.myColor(domain))
    }

    return palette
  }

  private addLegend(): void {
    let colorDomain: any = [...new Set(this.config.dataset.map(row => row.Genre))];
    console.log(colorDomain)

    let svg = d3.select("#Legend").attr('width', 882);
    let legend = legendColor()
                  .orient('horizontal')
                  .shapeWidth(70)
                  .scale(this.myColor);

    svg.append('g').attr("transform", "translate(10,67)").call(legend);
  }
}


