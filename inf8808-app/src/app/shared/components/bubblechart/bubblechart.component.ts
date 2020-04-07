import { Component, OnInit, Input } from '@angular/core';
import { ClusteringConfig } from '../../graph-configuration';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubblechart',
  templateUrl: './bubblechart.component.html',
  styleUrls: ['./bubblechart.component.css']
})
export class BubblechartComponent implements OnInit {

  @Input() config: ClusteringConfig;

  private model;
  private data = [];

  constructor() { }

  ngOnInit(): void {
    this.configuration();  
  }

  /*
  private setScale(): void {
    const scalepop = d3.scaleSqrt().domain([0, 100000]).range([0.2, 24]),
          scalecountry = d3.scaleOrdinal(d3.schemeCategory20b),
          centerx = d3.scaleLinear().range([width / 2 - height / 2 + margin, width / 2 + height / 2 - margin]),
          centery = d3.scaleLinear().range([margin, height - margin]);
  }
  */

  private configuration(): void {
    this.data = []   
    for (let i = 0; i < this.config.dataset.length; i++) {
      this.data.push([
        this.config.dataset[i]['Platform'],
        this.config.dataset[i]['Year_of_Release'],
        this.config.dataset[i]['Genre'],
        this.config.dataset[i]['Publisher'],
        this.config.dataset[i]['NA_Sales'],
        this.config.dataset[i]['EU_Sales'],
        this.config.dataset[i]['JP_Sales'],
        this.config.dataset[i]['Other_Sales'],
        this.config.dataset[i]['Critic_Count'],
        this.config.dataset[i]['Critic_Score'],
        this.config.dataset[i]['User_Score'],
        this.config.dataset[i]['User_Count'],
        this.config.dataset[i]['Developer'],
        this.config.dataset[i]['Rating'],
      ]);
    }
  }

}
