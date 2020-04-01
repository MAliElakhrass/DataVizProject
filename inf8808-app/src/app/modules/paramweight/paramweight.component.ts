import { BarChartConfig } from 'src/app/shared/graph-configuration';
import { ParamWeightDataService } from './../../services/param-weight-data.service';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as d3 from 'd3';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paramweight',
  templateUrl: './paramweight.component.html',
  styleUrls: ['./paramweight.component.css']
})
export class ParamweightComponent implements OnInit {

  // @Output() tabChange = new EventEmitter();

  public eventsSubject: Subject<BarChartConfig> = new Subject<BarChartConfig>();

  public bcConfig: BarChartConfig;

  private tabSelection: number;

  constructor(private dataService: ParamWeightDataService) {
    this.tabSelection = 0;
  }

  async ngOnInit() {
    await this.configureSelection();
    this.configurationBarChart(this.dataService.nonSaleData);
  }

  /**
   * Function that handle event when tab is clicked
   *
   */
  public async selectTab(tab: MatTabChangeEvent) {
    if (tab.index == 0) {
      this.tabSelection = 0;
      await this.configurationBarChart(this.dataService.nonSaleData);
    } else if (tab.index == 1) {
      this.tabSelection = 1;
      await this.configurationBarChart(this.dataService.saleData);
    }

    this.eventsSubject.next(this.bcConfig);
  }

  /**
   * Configure the selections by adding the text and
   * handle event when they are clicked
   *
   */
  private configureSelection(): void {
    var selections = ['Attribute name', 'Ascending', 'Descending'];

    d3.select("select")
      .on("change", async e => {
        let selectOptions = d3.select('#tabSelection').property("value");

        if (selectOptions == 0) {
          await this.dataService.sortData('alpha');
        }
        else if (selectOptions == 1) {
          await this.dataService.sortData('ascending');
        }
        else if (selectOptions == 2) {
          await this.dataService.sortData('descending');
        }

        if (this.tabSelection == 0) {
          await this.configurationBarChart(this.dataService.nonSaleData);
        } else if (this.tabSelection == 1) {
          await this.configurationBarChart(this.dataService.saleData);
        }
        this.eventsSubject.next(this.bcConfig);
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
  private async configurationBarChart(dataset) {
    dataset.then(data => {
      this.bcConfig = {
        width: 1000,
        height: 750,
        marginTop: 55,
        marginBottom: 150,
        marginRight: 75,
        marginLeft: 75,
        title: this.tabSelection == 0 ? 'Non Sales Parameters Weight Coefficient' : 'Sales Parameters Weight Coefficient',
        dataset: data
      };
    });
  }
}
