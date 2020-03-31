import { BarChartConfig } from './../../barchart-configuration';
import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import d3Tip from "d3-tip";
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() config: BarChartConfig;

  private eventsSubscription: Subscription;
  @Input() events: Observable<BarChartConfig>;

  private width: number;
  private height: number;

  private formatDecimal = d3.format(".4f");
  private color = d3.scaleOrdinal(d3.schemeCategory10);

  private x;
  private y;
  private g;
  private xAxis;
  private yAxis;
  private tip;

  constructor() {
    this.tip = d3Tip().attr('class', 'd3-tip')
                      .offset([-10, 0])
                      .html(d => this.formatDecimal(d.weight));
  }

  ngOnInit(): void {
    this.configuration();
    this.setScales();
    this.createSVGobject();
    this.setDomains();
    this.createAxis();
    this.createBarChart();

    this.eventsSubscription = this.events.subscribe((data) => {
      this.config = data;
      this.updateBarChart();
    });
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

  private createBarChart(): void {

    this.g.call(this.tip);

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

    bars.on('mouseover', this.tip.show)
        .on('mouseout', this.tip.hide);
  }

  private updateBarChart(): void {
    this.setDomains();

    this.g.select('.x.axis')
          .call(this.xAxis)
          .selectAll("text")
          .attr("transform", "rotate(30) ")
          .style("text-anchor", "start");
      
    this.g.append("text")
          .attr("transform", "translate(" + (this.width/2) + " ," +  (this.height + 75) + ")")
          .style("text-anchor", "middle");
      
    var bars = this.g.selectAll("rect")
                     .remove()
                     .exit()
                     .data(this.config.dataset)
                     .enter()
                     .append("rect")
                     .style("fill", d => this.color(d.parameter))
                     .attr("x", d =>  this.x(d.parameter))
                     .attr("width", this.x.bandwidth())
                     .attr("y",  d => { return this.height; })
                     .attr("height", 0);
  
    bars.transition()
        .duration(1000)
        .delay(function (d, i) {
            return i * 150;
        })
        .attr("y",  d => { return this.y(d.weight); })
        .attr("height",  d => { return this.height - this.y(d.weight); });
  
      bars.on('mouseover', this.tip.show)
          .on('mouseout', this.tip.hide);
  }
}
