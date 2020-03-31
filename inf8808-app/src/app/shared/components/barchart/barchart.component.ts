import { BarChartConfig } from './../../barchart-configuration';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import d3Tip from "d3-tip";

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() config: BarChartConfig;

  private width: number;
  private height: number;

  private formatDecimal = d3.format(".4f");
  private color = d3.scaleOrdinal(d3.schemeCategory10);

  private x;
  private y;
  private g;
  private xAxis;
  private yAxis;

  constructor() { }

  ngOnInit(): void {
    this.configuration();
    this.setScales();
    this.createSVGobject();
    this.setDomains();
    this.createAxis();
    this.createBarChart();
  }

  private configuration(): void {
    this.width = this.config.width - this.config.marginLeft - this.config.marginRight;
    this.height = this.config.height - this.config.marginTop - this.config.marginBottom;
  }

  private setScales(): void {
    this.x = d3.scaleBand()
               .range([0, this.width]);
    this.y = d3.scaleLinear()
               .range([this.height, 0]);
  }

  private createSVGobject(): void {
    this.g = d3.select("#bar-chart-svg")
               .attr("width", this.config.width)
               .attr("height", this.config.height)
               .append('g')
               .attr('transform',
                     'translate(' + this.config.marginLeft + ','
                     + this.config.marginTop + ')');
  }

  private setDomains(): void {
    let parameters = this.config.dataset.map(row => row.parameter);
    let coefs = this.config.dataset.map(d => d.weight);

    this.color.domain(parameters);
    this.x.domain(parameters);
    this.y.domain([d3.min(coefs), d3.max(coefs)]);
  }

  private static getToolTipText(d) {
    return d3.format(".4f")(d.weight);
  }

  private createAxis(): void {
    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y).tickFormat(this.formatDecimal);

    this.g.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(" + 0 + "," + this.height + ")")
          .call(this.xAxis)
          .selectAll("text")
          .attr("transform", "rotate(30) ")
          .style("text-anchor", "start");

    this.g.append("text")
          .attr("transform", "translate(" + (this.width/2) + " ," +  (this.height + 75) + ")")
          .style("text-anchor", "middle")
          .text("Parameters");

    this.g.append("g")
          .attr("class", "axis y")
          .call(this.yAxis);

    this.g.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -75)
          .attr("x", -(this.height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Coefficient");
  }

  private showTooltip(event: any, tip: d3Tip) {
    let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    tip.show.call(this, event);

    // Workaround pour Firefox
    let top = parseInt(tip.style('top'), 10);
    while (top > height) {
      top = top - (height + 40);
    }
    tip.style('top', top + 'px');
  }

  private createBarChart(): void {

    let tip: any = d3Tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(d => this.formatDecimal(d.weight));

    this.g.call(tip);

    let bars = this.g.selectAll(".bar")
                     .data(this.config.dataset)
                     .enter()
                     .append("rect")
                     .style("fill", d => this.color(d.parameter))
                     .attr("x", d => this.x(d.parameter))
                     .attr("width", this.x.bandwidth())
                     .attr("y",  d => { return this.height; })
                     .attr("height", 0);

    bars.transition()
        .duration(750)
        .delay(function (d, i) {
            return i * 150;
        })
        .attr("y",  d => {
          return this.y(d.weight);
        })
        .attr("height",  d => {
          return this.height - this.y(d.weight);
        });

    bars.on('mouseover', tip.show)
        .on('mouseout', tip.hide);
  }

}
