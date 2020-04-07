import { Component, OnInit } from '@angular/core';
import { ClusteringDataService } from 'src/app/services/clustering-data.service';
import { ClusteringConfig } from 'src/app/shared/graph-configuration';

@Component({
  selector: 'app-clusteranalysis',
  templateUrl: './clusteranalysis.component.html',
  styleUrls: ['./clusteranalysis.component.css']
})
export class ClusteranalysisComponent implements OnInit {

  public cConfig: ClusteringConfig;

  constructor(private dataService: ClusteringDataService) { }

  ngOnInit(): void {
    this.configurateClustering();
  }

  private configurateClustering(): void {
    this.dataService.clusteringData.then(data => {
      this.cConfig = {
        width: 960,
        height: 500,
        margins: 40,
        dataset: data
      }
    });
  }

}
