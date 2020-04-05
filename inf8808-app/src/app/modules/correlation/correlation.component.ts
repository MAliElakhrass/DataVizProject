import { Component, OnInit } from '@angular/core';
import { HeatMapConfig, ScatterPlotConfig } from 'src/app/shared/graph-configuration';
import { CorrelationDataService } from 'src/app/services/correlation-data.service';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent implements OnInit {

  public hmConfig: HeatMapConfig;
  public spConfig: ScatterPlotConfig;
  public selectedClass;

  constructor(private dataService: CorrelationDataService) {
    this.selectedClass = false;
  }

  ngOnInit(): void {
    this.configurationBarChart();
  }

  public showPanel(data): void {
    this.configurationScatterPlot(data.x, data.y);
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
        title: 'Yed',
        axisYTitle: x,
        axisXTitle: y,
        width: 460,
        height: 410,
        marginTop: 10,
        marginBottom: 30,
        marginRight: 30,
        marginLeft: 60,
        dataset: data
      };
    });
  }
}
