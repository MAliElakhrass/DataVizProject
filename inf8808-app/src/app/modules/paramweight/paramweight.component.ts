import { BarChartConfig } from 'src/app/shared/graph-configuration';
import { ParamWeightDataService } from './../../services/param-weight-data.service';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

interface Selections {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-paramweight',
  templateUrl: './paramweight.component.html',
  styleUrls: ['./paramweight.component.css']
})
export class ParamweightComponent implements OnInit {

  public eventsSubject: Subject<BarChartConfig> = new Subject<BarChartConfig>();
  public bcConfig: BarChartConfig;
  private sideNavOpen: Boolean;

  public selections = [
    {value: 'alpha', viewValue: 'Attribute name'},
    {value: 'ascending', viewValue: 'Ascending'},
    {value: 'descending', viewValue: 'Descending'},
  ]

  private tabSelection: number;

  constructor(private dataService: ParamWeightDataService,
              private uiService: UiService) {
    this.sideNavOpen = true;
    this.tabSelection = 0;
    this.uiService.changeEmitted$.subscribe(data => {
      console.log(window)
      this.sideNavOpen = data;
    })
  }

  async ngOnInit() {
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
  public async configureSelection(value): Promise<void> {
    await this.dataService.sortData(value);

    if (this.tabSelection == 0) {
      await this.configurationBarChart(this.dataService.nonSaleData);
    } else if (this.tabSelection == 1) {
      await this.configurationBarChart(this.dataService.saleData);
    }
    this.eventsSubject.next(this.bcConfig);
  }

  /**
   * Configure all the bar chart parameters
   *
   * @param data    Data that comes from a CSV file
   */
  private async configurationBarChart(dataset) {
    dataset.then(data => {
      console.log(window)
      this.bcConfig = {
        width: window.innerWidth*0.75,
        height: 650,
        marginTop: 55,
        marginBottom: 100,
        marginRight: 75,
        marginLeft: 85,
        title: this.tabSelection == 0 ? 'Non Sales Parameters Weight Coefficient' : 'Sales Parameters Weight Coefficient',
        dataset: data
      };
    });
  }
}
