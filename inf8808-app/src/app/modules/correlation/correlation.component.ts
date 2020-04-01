import { Component, OnInit } from '@angular/core';
import { HeatMapConfig } from 'src/app/shared/graph-configuration';
import { CorrelationDataService } from 'src/app/services/correlation-data.service';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent implements OnInit {

  public hmConfig: HeatMapConfig;

  constructor(private dataService: CorrelationDataService) {
    
  }

  ngOnInit(): void {
    this.configurationBarChart();
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



}
