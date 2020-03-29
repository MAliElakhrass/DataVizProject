import { ParamWeightDataService } from './../../services/param-weight-data.service';
import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as d3 from 'd3';


@Component({
  selector: 'app-paramweight',
  templateUrl: './paramweight.component.html',
  styleUrls: ['./paramweight.component.css']
})
export class ParamweightComponent implements OnInit {

  constructor(private dataService: ParamWeightDataService) { }

  ngOnInit(): void {
    this.configureSelection();
    this.configurationBarChart();
  }

  /**
   * Function that handle event when tab is clicked
   *
   */
  public tabSelected(tab: MatTabChangeEvent) {
    console.log(tab.index)
  }

  /**
   * Configure the selections by adding the text and
   * handle event when they are clicked
   *
   */
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
