import { Component, OnInit, Input } from '@angular/core';
import { HeatMapConfig } from '../../graph-configuration';
import * as d3 from 'd3';
import d3Tip from "d3-tip";

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  @Input() config: HeatMapConfig;

  private formatDecimal = d3.format(".4f");

  private g;
  private legendSVG;
  private x;
  private y;
  private colors;
  private tip;

  private attributes: string[];
  private width;
  private height;
  private legendHeight;
  private barHeight;
  private legendPadding;
  private innerWidth;

  constructor() {
    this.attributes = ['Critic_Count', 'Critic_Score', 'EU_Sales','JP_Sales', 
                       'User_Score', 'NA_Sales', 'Other_Sales', 'User_Count',
                       'Year_of_Release'];
    this.legendHeight = 28;
    this.barHeight = 28;
    this.legendPadding = 9;
  }

  ngOnInit(): void {
    this.configuration();
    this.setScales();
    this.createSVGobject();
    this.createLegendObject();
    this.createAxis();
    this.createHeatmap();
  }

  private configuration(): void {
    this.width = this.config.width - this.config.marginLeft - this.config.marginRight;
    this.height = this.config.height - this.config.marginTop - this.config.marginBottom;

    this.innerWidth = this.width - this.legendPadding * 2;
  }

  private setScales(): void {
    this.x = d3.scaleBand()
               .range([0, this.width])
               .domain(this.attributes)
               .padding(0.01);

    this.y = d3.scaleBand()
              .range([this.height, 0 ])
              .domain(this.attributes)
              .padding(0.01);

    this.colors = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]);
  }

  private createSVGobject(): void {
    this.g = d3.select('#heatmap-svg')
               .append("svg")
               .attr("width", this.width + this.config.marginLeft + this.config.marginRight)
               .attr("height", this.height + this.config.marginTop + this.config.marginBottom)
               .append("g")
               .attr("transform", "translate(" + this.config.marginLeft + "," + this.config.marginTop + ")");
  }

  private createAxis(): void {
    let xAxis = d3.axisBottom(this.x);
    this.g.append("g")
          .attr("transform", "translate(0," + this.height + ")")
          .call(xAxis)
          .selectAll("text")
          .attr("transform", "rotate(30) ")
          .style("text-anchor", "start");

    let yAxis = d3.axisLeft(this.y);
    this.g.append('g')
          .call(yAxis);
  }

  private createLegendObject(): void {
    this.legendSVG = d3.select("#legend-svg")
                       .append("svg")
                       .attr("width", this.width)
                       .attr("height", this.legendHeight)
                       .append("g")
                       .attr("transform", "translate(" + this.legendPadding + ", 0)");
  }

  private createHeatmap(): void {
    this.tip = d3Tip().attr('class', 'd3-tip').offset([-10, 0]);
    this.tip.html(d => {
      return this.formatDecimal(d.value);
    });
    this.g.call(this.tip);

    var map = this.g.selectAll()
                    .data(this.config.dataset, d => {return d.x + ':' + d.y;})
                    .enter()
                    .append("rect")
                    .attr("x", d => { return this.x(d.x) })
                    .attr("y", d => { return this.y(d.y) })
                    .attr("width", this.x.bandwidth())
                    .attr("height", this.y.bandwidth())
                    .style("fill", d => { return this.colors(d.value)} )
                    .on("click", function (d) {
                      console.log('click')
                        // showPanel(d.x, d.y);
                    });

    map.on('mouseover', this.tip.show)
       .on('mouseout', this.tip.hide);
  }

}
