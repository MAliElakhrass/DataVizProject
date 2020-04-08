import { Component, OnInit, HostListener } from '@angular/core';
import { ClusteringDataService, ClusteringData } from 'src/app/services/clustering-data.service';
import { ClusteringConfig } from 'src/app/shared/graph-configuration';

@Component({
  selector: 'app-clusteranalysis',
  templateUrl: './clusteranalysis.component.html',
  styleUrls: ['./clusteranalysis.component.css']
})
export class ClusteranalysisComponent implements OnInit {

  public cConfig: ClusteringConfig;
  private dataset: ClusteringData[] = [];

  constructor(private dataService: ClusteringDataService) { }

  async ngOnInit(): Promise<void> {
    await this.mergeDataset();
    this.configurateClustering();
  }
  
  private async mergeDataset(): Promise<void> {
    await this.dataService.videogameData.then( async d => {
      await this.dataService.clusteringData.then(d2 => {
        for (let index = 0; index < d.length; index++) {
          this.dataset.push({
            Name: d[index].Name,
            Platform: d[index].Platform,
            Year_of_Release: d[index].Year_of_Release,
            Genre: d[index].Genre,
            Publisher: d[index].Publisher,
            NA_Sales: d[index].NA_Sales,
            EU_Sales: d[index].EU_Sales,
            JP_Sales: d[index].JP_Sales,
            Other_Sales: d[index].Other_Sales,
            Critic_Count: d[index].Critic_Count,
            Critic_Score: d[index].Critic_Score,
            User_Score: d[index].User_Score,
            User_Count: d[index].User_Count,
            Developer: d[index].Developer,
            Rating: d[index].Rating,
            x: d2[index].x,
            y: d2[index].y,
          })
        } 
      })
    })
  }

  private configurateClustering(): void {
    this.cConfig = {
      width: window.innerWidth - 400,
      height: window.innerHeight - 100,
      marginTop: 10,
      marginBottom: 10,
      marginRight: 25,
      marginLeft: 25,
      radiusParameter: 'NA_Sales',
      dataset: this.dataset,
    };
  }

}
