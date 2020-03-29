import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-paramweight',
  templateUrl: './paramweight.component.html',
  styleUrls: ['./paramweight.component.css']
})
export class ParamweightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.configureSelection();
    this.configurationBarChart();
  }

  private configureSelection(): void {
    var selections = ['Attribute name', 'Ascending', 'Descending'];

    d3.select("select")
      .on("change", function() {
        let selectOptions = d3.select(this).property("value");
        console.log(selectOptions);
      })
      .selectAll("option")
      .data(selections)
      .enter()
      .append("option")
      .attr("value", function(d, i) {
          return i;
      })
      .text(function (d, i) {
          return selections[i]
      });
  }

  
  /**
   * Configure all the bar chart parameters
   *
   * @param data    Data that comes from a CSV file
   */
  private configurationBarChart() {

  }
}
