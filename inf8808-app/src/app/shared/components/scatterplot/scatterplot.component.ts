import { Component, OnInit, Input } from '@angular/core';
import { ScatterPlotConfig } from '../../graph-configuration';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {

  @Input() config: ScatterPlotConfig;

  private width;
  private height;

  private g;
  private x;
  private y;

  private data = [];

  constructor() { }

  ngOnInit(): void {
    this.configuration();
    this.setScale();
    this.createSVGElement();
    this.createAxis();
    this.createScatterPlot();
  }

  private configuration(): void {    
    for (let i = 0; i < this.config.dataset.length; i++) {
      this.data.push({
        'x': this.config.dataset[i][this.config.axisXTitle],
        'y': this.config.dataset[i][this.config.axisYTitle],
      });
    }

    this.width = this.config.width - this.config.marginLeft - this.config.marginRight;
    this.height = this.config.height - this.config.marginTop - this.config.marginBottom;
  }

  private setScale(): void {
    this.x = d3.scaleLinear().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);

    let dataX = this.config.dataset.map(row => row[this.config.axisXTitle]);
    let dataY = this.config.dataset.map(row => row[this.config.axisYTitle]);
    this.x.domain([d3.min(dataX), d3.max(dataX)]);
    this.y.domain([d3.min(dataY), d3.max(dataY)]);
  }

  private createSVGElement(): void {
    this.g = d3.select("#scatter")
               .append("svg")
               .attr("width", this.config.width)
               .attr("height", this.config.height)
               .append("g")
               .attr("transform", "translate(" + 
                     this.config.marginLeft + ", " + this.config.marginTop + ")");
  }

  private createAxis(): void {
    let xAxis = d3.axisBottom(this.x).tickFormat(d3.format(".2f"));;
    this.g.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(xAxis);

    this.g.append("text")
          .attr("transform", "translate(" + (this.width/2) + " ," +  (this.height + this.config.marginBottom) + ")")
          .style("text-anchor", "middle")
          .text(this.config.axisXTitle);

    let yAxis = d3.axisLeft(this.y);     
    this.g.append("g")
          .attr("class", "axis y")
          .call(yAxis);

    this.g.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -this.config.marginLeft)
          .attr("x", -(this.height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text(this.config.axisYTitle);
  }

  private createScatterPlot(): void {
    this.g.append("g")
          .selectAll("dot")
          .data(this.data)
          .enter()
          .append("circle")
          .attr("cx", d => this.x(d.x))
          .attr("cy", d => this.y(d.y))
          .attr("r", 1.5)
          .style("fill", "#69b3a2");

    this.g.append("text")
          .classed("title", true)
          .attr("x", (this.width / 2))             
          .attr("y", 0 - (this.config.marginTop / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text(this.config.title);
  }
}
