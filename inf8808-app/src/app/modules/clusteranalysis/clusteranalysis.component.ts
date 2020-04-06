import { Component, OnInit } from '@angular/core';
import { ClusteringDataService } from 'src/app/services/clustering-data.service';

@Component({
  selector: 'app-clusteranalysis',
  templateUrl: './clusteranalysis.component.html',
  styleUrls: ['./clusteranalysis.component.css']
})
export class ClusteranalysisComponent implements OnInit {

  constructor(private dataService: ClusteringDataService) { }

  ngOnInit(): void {
  }

}
