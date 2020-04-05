import { Component, OnInit } from '@angular/core';
import { HeatMapConfig, ScatterPlotConfig } from 'src/app/shared/graph-configuration';
import { CorrelationDataService } from 'src/app/services/correlation-data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent implements OnInit {

  public eventsSubject: Subject<ScatterPlotConfig> = new Subject<ScatterPlotConfig>();

  public hmConfig: HeatMapConfig;
  public spConfig: ScatterPlotConfig;
  public selectedClass;

  constructor(private dataService: CorrelationDataService) {
    this.selectedClass = false;
  }

  ngOnInit(): void {
    this.configurationBarChart();
  }

  public async showPanel(data): Promise<void> {
    await this.configurationScatterPlot(data.x, data.y);

    if (this.selectedClass == true) {
      this.eventsSubject.next(this.spConfig);
    }

    this.selectedClass = true;
  }

  public closePanel(): void {
    this.selectedClass = false;
    this.spConfig = null;
  }

  /**
   * Configure all the heatmap parameters
   *
   */
  private configurationBarChart(): void {
    this.dataService.correlationData.then(data => {
      this.hmConfig = {
        width: 750,
        height: 700,
        marginTop: 35,
        marginBottom: 85,
        marginRight: 85,
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
        axisYTitle: x,
        axisXTitle: y,
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
