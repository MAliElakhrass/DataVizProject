import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeatMapConfig, ScatterPlotConfig } from 'src/app/shared/graph-configuration';
import { CorrelationDataService } from 'src/app/services/correlation-data.service';
import { Subject } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent implements AfterViewInit {

  public eventsSubject: Subject<ScatterPlotConfig> = new Subject<ScatterPlotConfig>();
  public hmEventsSubject: Subject<HeatMapConfig> = new Subject<HeatMapConfig>();

  public hmConfig: HeatMapConfig;
  public spConfig: ScatterPlotConfig;
  private innerWidth: number;

  constructor(private dataService: CorrelationDataService,
              private uiService: UiService) {
    this.innerWidth = window.innerWidth - 300;
  }

  async ngAfterViewInit(): Promise<void> {
    this.configurationHeatmap();

    this.configurationScatterPlot('Critic_Count', 'Year_of_Release');

    this.uiService.changeEmitted$.subscribe(async data => {
      data ? this.innerWidth = window.innerWidth - 300 : this.innerWidth = window.innerWidth;
      await this.configurationHeatmap();

      this.hmEventsSubject.next(this.hmConfig);
    })
  }

  public async showScatterPlot(data): Promise<void> {
    await this.configurationScatterPlot(data.x, data.y);

    this.eventsSubject.next(this.spConfig);
  }

  /**
   * Configure all the heatmap parameters
   *
   */
  private configurationHeatmap(): void {
    this.dataService.correlationData.then(data => {
      this.hmConfig = {
        width: this.innerWidth*0.45,
        height: this.innerWidth*0.45-65,
        marginTop: 35,
        marginBottom: 85,
        marginRight: 100,
        marginLeft: 85,
        dataset: data
      };
    });
  }

  /**
   * Configure all the scatterplot parameters
   *
   */
  private configurationScatterPlot(x: string, y: string): void {
    this.dataService.scatterPlotData.then(data => {
      this.spConfig = {
        title: 'Correlation between ' + x + " and " + y,
        axisYTitle: y,
        axisXTitle: x,
        width: 510,
        height: 460,
        marginTop: 35,
        marginBottom: 30,
        marginRight: 30,
        marginLeft: 60,
        dataset: data
      };
    });
  }
}
